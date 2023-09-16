import React from "react";
import {
	Box,
	TextField,
	Button,
	MenuItem,
	InputLabel,
	FormControl,
} from "@mui/material";
import { Theme, useTheme } from "@mui/material/styles";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import OutlinedInput from "@mui/material/OutlinedInput";
import { Questions } from "./Questions";
import FollowTopics from "./FollowTopics";
import * as TopicService from "../../services/TopicService";
import { useFormik } from "formik";
import { string } from "yup";
import * as QuestionService from "../../services/QuestionService";
import { AxiosError } from "axios";
import { enqueueSnackbar } from "notistack";
import { RootState } from "../../redux/store";
import { useSelector } from "react-redux";
import { CreateQuestionSchema } from "../../utils/validations";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
	PaperProps: {
		style: {
			maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
			width: 250,
		},
	},
};

function getStyles(name: string, personName: string[], theme: Theme) {
	return {
		fontWeight:
			personName.indexOf(name) === -1
				? theme.typography.fontWeightRegular
				: theme.typography.fontWeightMedium,
	};
}

const Home = React.memo(() => {
	const [topics, setTopics] = React.useState([]);
	const [questions, setQuestions] = React.useState([]);
	const user = useSelector((state: RootState) => state.user);

	React.useEffect(() => {
		const getAllTopics = async () => {
			try {
				const result = await TopicService.getAll();
				if (result) {
					setTopics(result.topics);
				}
			} catch (error) {
				setTopics([]);
			}
		};
		const getAllQuestionsFromUserFollowedTopic = async () => {
			try {
				const result = await QuestionService.getAllUserFollowedTopicQuestions(
					user && user.data?.id
				);
				if (result) {
					setQuestions(result.questions);
				}
			} catch (error) {
				setQuestions([]);
			}
		};
		getAllQuestionsFromUserFollowedTopic();
		getAllTopics()
	}, [user]);

	const theme = useTheme();

	const handleChange = (event: SelectChangeEvent<(typeof string)[]>) => {
		const {
			target: { value },
		} = event;
		formik.setFieldValue(
			"topicIds",
			typeof value === "string" ? value.split(",") : value
		);
	};

	const formik = useFormik({
		initialValues: {
			body: "",
			topicIds: [],
		},
		enableReinitialize: true,
		validationSchema: CreateQuestionSchema,
		onSubmit: async (values, { resetForm }) => {
			try {
				const result = await QuestionService.create({
					...values,
					authorId: user.data?.id,
				});
				if (result) {
					enqueueSnackbar(result.message, { variant: "success" });
					resetForm();
				}
			} catch (error) {
				console.log(error);
				if (error instanceof AxiosError) {
					enqueueSnackbar(error.response?.data.message, {
						variant: "error",
					});
				} else {
					enqueueSnackbar("failed to add question", {
						variant: "error",
					});
				}
				resetForm();
			}
		},
	});

	return (
		<Box sx={{ display: "flex", pt: "80px" }}>
			<Box
				sx={{
					ml: "350px",
					width: "300px",
					height: "700px",
					mr: "30px",
				}}
			>
				<FollowTopics topics={topics} />
			</Box>
			<Box sx={{width:"600px"}}>
				<Box
					sx={{
						display: "flex",
						flexDirection: "column",
						justifyContent: "center",
						alignItems: "center",
					}}
				>
					<Box
						sx={{
							width:"100%",
							display: "flex",
							flexDirection: "column",
							justifyContent: "center",
							alignItems: "center",
							backgroundColor: "white",
							p: 3,
							borderRadius: 3,
						}}
					>
						<form style={{width:"100%"}} onSubmit={formik.handleSubmit}>
							<TextField
								fullWidth
								name="body"
								label="Ask Your Question"
								value={formik.values.body}
								onChange={formik.handleChange}
								error={formik.touched.body && Boolean(formik.errors.body)}
								helperText={formik.touched.body && formik.errors.body}
								sx={{ width: "100%", mb: 2 }}
							/>

							<FormControl
								variant="outlined"
								style={{ width: "100%", marginBottom: 4 }}
							>
								<InputLabel id="test-select-label">
									Select Your Topics
								</InputLabel>
								<Select
									label="Select Your Topics"
									labelId="demo-multiple-name-label"
									id="demo-multiple-name"
									multiple
									value={formik.values.topicIds}
									onChange={handleChange}
									error={true}
									input={<OutlinedInput label="Select Your Topics" />}
									MenuProps={MenuProps}
									sx={{ width: "100%" }}
									displayEmpty
								>
									{topics.length > 0 ? (
										topics.map((item: any) => (
											<MenuItem
												key={item.id}
												value={item.id}
												style={getStyles(
													item.title,
													formik.values.topicIds,
													theme
												)}
											>
												{item.title}
											</MenuItem>
										))
									) : (
										<div></div>
									)}
								</Select>
							</FormControl>
							<Button
								sx={{
									marginTop: "5px",
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
								Post Question
							</Button>
						</form>
					</Box>
				</Box>
				<Box
					sx={{
						mt: 2,
						mb:2
					}}
				>
					<Questions questions={questions} />
				</Box>
			</Box>
		</Box>
	);
});

export default Home;
