import * as React from "react";
import { Box, TextField, Button, MenuItem } from "@mui/material";
import { useFormik } from "formik";
import Grid from "@mui/material/Grid";
import { SignUpSchema, LoginSchema } from "../../utils/validations";
import { useNavigate } from "react-router-dom";
import { login, signup } from "../../redux/slices/user.slice";
import { useSnackbar } from "notistack";
import { useAppDispatch } from "../../redux/store";
import { AxiosError } from "axios";
import Logo from "../../components/Logo";
import { Size } from "../../utils/enums";
import { RootState } from "../../redux/store";
import { useSelector } from "react-redux";

export const Login = React.memo(() => {
	const dispatch = useAppDispatch();
	const { enqueueSnackbar } = useSnackbar();
	const [signupForm, setSignUpForm] = React.useState(true);
	const navigate = useNavigate();

	const user = useSelector((state: RootState) => state.user);

	React.useEffect(() => {
		if (user.data?.email) {
			navigate("/home");
		}
	}, [navigate, user]);

	const formik = useFormik({
		initialValues: {
			name: "",
			email: "",
			password: "",
			username: "",
			age: "",
			gender: "",
			isSignup: signupForm,
		},
		enableReinitialize: true,
		validationSchema: signupForm ? SignUpSchema : LoginSchema,
		onSubmit: (values) => {
			if (signupForm) {
				dispatch(signup({ ...values }))
					.unwrap()
					.then((res) => {
						if (!res.status) {
							enqueueSnackbar(res?.message, {
								variant: res.status ? "success" : "error",
							});
							return;
						}
						navigate("/home");
					})
					.catch(() => {
						enqueueSnackbar("Error", {
							variant: "error",
						});
					});
			} else {
				dispatch(login({ email: values.email, password: values.password }))
					.unwrap()
					.then((res) => {
						if (res instanceof AxiosError) {
							enqueueSnackbar(res.response?.data.message, {
								variant: "error",
							});
							return;
						}
						if (!res.status) {
							enqueueSnackbar("Error Loging In", {
								variant: "error",
							});
							return;
						}
						navigate(res.user.role == "admin" ? "/admin" : "/home");
					})
					.catch(() => {
						enqueueSnackbar("error", {
							variant: "error",
						});
					});
			}
		},
	});


	return (
		<Box
			sx={{
				display: "flex",
				flexDirection: "column",
				justifyContent: "center",
				alignItems: "center",
				pt: "70px",
			}}
		>
			<Box
				sx={{
					display: "flex",
					flexDirection: "column",
					justifyContent: "center",
					alignItems: "center",
					borderRadius: "12px",
					width: "500px",
					padding: "20px",
					bgcolor: "white",
				}}
			>
				<Logo size={Size.LARGE} />
				<form onSubmit={formik.handleSubmit}>
					<Grid container spacing={0}>
						{signupForm ? (
							<>
								<Grid item xs={12}>
									<TextField
										fullWidth
										name="name"
										label="Name"
										value={formik.values.name}
										onChange={formik.handleChange}
										error={
											signupForm &&
											formik.touched.name &&
											Boolean(formik.errors.name)
										}
										helperText={
											signupForm && formik.touched.name && formik.errors.name
										}
										sx={{ margin: "10px 0" }}
									/>
								</Grid>
								<Grid item xs={12}>
									<TextField
										fullWidth
										name="username"
										label="Username"
										value={formik.values.username}
										onChange={formik.handleChange}
										error={
											signupForm &&
											formik.touched.username &&
											Boolean(formik.errors.username)
										}
										helperText={
											signupForm &&
											formik.touched.username &&
											formik.errors.username
										}
										sx={{ margin: "10px 0" }}
									/>
								</Grid>
							</>
						) : (
							<></>
						)}
						<Grid item xs={12}>
							<TextField
								fullWidth
								name="email"
								label="Email"
								value={formik.values.email}
								onChange={formik.handleChange}
								error={formik.touched.email && Boolean(formik.errors.email)}
								helperText={formik.touched.email && formik.errors.email}
								sx={{ margin: "10px 0" }}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								fullWidth
								name="password"
								label="Password"
								type="password"
								value={formik.values.password}
								onChange={formik.handleChange}
								error={
									formik.touched.password && Boolean(formik.errors.password)
								}
								helperText={formik.touched.password && formik.errors.password}
								sx={{ margin: "10px 0" }}
							/>
						</Grid>
						{signupForm ? (
							<Box
								sx={{
									width: "100%",
									display: "flex",
									justifyContent: "space-around",
								}}
							>
								<Grid item xs={12}>
									<TextField
										fullWidth
										name="age"
										label="Age"
										type="number"
										value={formik.values.age}
										onChange={formik.handleChange}
										error={formik.touched.age && Boolean(formik.errors.age)}
										helperText={formik.touched.age && formik.errors.age}
										sx={{ margin: "10px 0", width: "90%" }}
									/>
								</Grid>
								<Grid item xs={12}>
									<TextField
										sx={{
											textAlign: "left",
											marginTop: "10px",
											width: "100%",
										}}
										value={formik.values.gender}
										name="gender"
										onChange={formik.handleChange}
										select
										label="Gender"
										error={
											signupForm &&
											formik.touched.gender &&
											Boolean(formik.errors.gender)
										}
										helperText={
											signupForm &&
											formik.touched.gender &&
											formik.errors.gender
										}
									>
										<MenuItem value={"Male"} key={1}>
											Male
										</MenuItem>
										<MenuItem value={"Female"} key={2}>
											Female
										</MenuItem>
										<MenuItem value={"null"} key={3}>
											Can't Say
										</MenuItem>
									</TextField>
								</Grid>
							</Box>
						) : (
							<></>
						)}
					</Grid>
					<Button
						sx={{
							marginTop: "10px",
							fontWeight: "bold",
							width: "100%",
							bgcolor: "#000",
							"&:hover": {
								backgroundColor: "#b92b27",
							},
						}}
						size="medium"
						type="submit"
						variant="contained"
					>
						{signupForm ? "Sign Up" : "Login"}
					</Button>
				</form>
				{signupForm ? (
					<p className="mt-2 ">
						Already have an account?{" "}
						<span
							onClick={() => {
								setSignUpForm(false);
							}}
							className="signup-link"
						>
							Login
						</span>
					</p>
				) : (
					<p className="mt-2 ">
						Don't have an account?{" "}
						<span
							onClick={() => {
								setSignUpForm(true);
							}}
							className="signup-link"
						>
							Sign up
						</span>
					</p>
				)}
			</Box>
		</Box>
	);
});
