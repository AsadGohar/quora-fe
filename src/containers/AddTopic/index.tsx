import * as React from "react";
import { Box, TextField, Button } from "@mui/material";
import Grid from "@mui/material/Grid";
import { useFormik } from "formik";
import { AddTopicSchema } from "../../utils/validations";
import * as TopicService from "../../services/TopicService";
import { AxiosError } from "axios";
import { enqueueSnackbar } from "notistack";

const AddTopic = () => {
	const [picture, setPicture] = React.useState("");
	const [pictureUrl, setPictureUrl] = React.useState("");

	const selectPicture = async (e: any) => {
		try {
			const file = e.target.files[0];
			setPicture(file);
			formik.setFieldValue("picture", file);
			setPictureUrl(URL.createObjectURL(file));
			console.log("Selected file:", file.name);
		} catch (error) {
			formik.setFieldValue("picture", formik.values.picture);
		}
	};

	const formik = useFormik({
		initialValues: {
			title: "",
			description: "",
			picture: "",
		},
		enableReinitialize: true,
		validationSchema: AddTopicSchema,
		onSubmit: async (values, {resetForm}) => {
			try {
				const result = await TopicService.create({
					title: values.title,
					description: values.description,
					image: values.picture,
				});
				if (result) {
					enqueueSnackbar(result.message, {
						variant: "success",
					});
					resetForm()
				}
			} catch (error) {
				console.log(error);
				resetForm()
				if (error instanceof AxiosError) {
					enqueueSnackbar(error.response?.data.message, {
						variant: "error",
					});
				} else {
					enqueueSnackbar("Failed to add topic", {
						variant: "error",
					});
				}
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
				<h5>Add Topic</h5>
				<form onSubmit={formik.handleSubmit}>
					<Grid container spacing={0}>
						<Grid item xs={12}>
							<TextField
								fullWidth
								name="title"
								label="Title"
								value={formik.values.title}
								onChange={formik.handleChange}
								error={formik.touched.title && Boolean(formik.errors.title)}
								helperText={formik.touched.title && formik.errors.title}
								sx={{ margin: "10px 0" }}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								fullWidth
								name="description"
								label="Description"
								type="text"
								value={formik.values.description}
								onChange={formik.handleChange}
								error={
									formik.touched.description &&
									Boolean(formik.errors.description)
								}
								helperText={
									formik.touched.description && formik.errors.description
								}
								sx={{ margin: "10px 0" }}
							/>
						</Grid>
					</Grid>
					<Grid item xs={12}>
						{pictureUrl.length > 0 && (
							<img
								style={{
									height: "300px",
									width: "300px",
									marginBottom: "20px",
								}}
								src={pictureUrl}
							/>
						)}
						<label htmlFor="upload-photo">
							<input
								style={{ display: "none" }}
								id="upload-photo"
								accept="image/*"
								type="file"
								onChange={selectPicture}
							/>
							<Button color="info" variant="contained" component="span">
								Select Topic Picture
							</Button>
						</label>
					</Grid>
					<Button
						sx={{
							marginTop: "10px",
							fontWeight: "bold",
							width: "100%",
							bgcolor: "#000",
							"&:hover": {
								backgroundColor: "green",
							},
						}}
						size="medium"
						type="submit"
						variant="contained"
					>
						Add Topic
					</Button>
				</form>
			</Box>
		</Box>
	);
};

export default AddTopic;
