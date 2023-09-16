import * as React from "react";
import { Box, TextField, Button, Divider } from "@mui/material";
import Grid from "@mui/material/Grid";
import { useFormik } from "formik";
import { AddTopicSchema } from "../../utils/validations";
import * as TopicService from "../../services/TopicService";
import { AxiosError } from "axios";
import { enqueueSnackbar } from "notistack";
import { useParams } from "react-router-dom";
import { Questions } from "../Home/Questions";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import * as UserService from "../../services/UserService";

const TopicDetail = () => {
	
	const params = useParams();
	const [page, setPage] = React.useState(1);
	const [topic, setTopic] = React.useState<any>({});
	const [questions, setQuestions] = React.useState([]);

	const user = useSelector((state: RootState) => state.user);

	React.useEffect(() => {
		const getTopicDetails = async () => {
			try {
				const result = await TopicService.getDetails({
					topicId: params.id,
					page,
				});
				if (result) {
					setTopic({ ...result.topic, followers: result.totalFollowers });
					setQuestions(result.questions);
				}
			} catch (error) {
				console.log(error);
			}
		};

		getTopicDetails();
	}, [params.id, page]);

	const followTopic = async () => {
		try {
			const result = await UserService.followTopic({
				userId: Number(user.data?.id),
				topicId: Number(params.id),
			});
			if (result) {
				enqueueSnackbar(result.message, {
					variant: "success",
				});
			}
		} catch (error) {
			console.log(error);
			if (error && error instanceof AxiosError) {
				enqueueSnackbar(error?.response?.data.message, {
					variant: "error",
				});
			} else {
				enqueueSnackbar("failed to follow topic", {
					variant: "error",
				});
			}
		}
	};

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
          width:"600px",
					display: "flex",
					flexDirection: "column",
					justifyContent: "center",
					alignItems: "center",
					borderRadius: "12px",
					padding: "20px",
					bgcolor: "white",
				}}
			>
				<Box
					sx={{
						width: "100%",
						display: "flex",
						alignItems: "center",
						justifyContent: "space-between",
						borderBottom: "1px solid grey",
						marginBottom: "20px",
						paddingBottom: "10px",
					}}
				>
					<h3>{topic?.title}</h3>
					<Box>
						<Button
							sx={{
								fontWeight: "bold",
								width: "200px",
								bgcolor: "#000",
								"&:hover": {
									backgroundColor: "black",
								},
							}}
							onClick={followTopic}
							size="medium"
							variant="contained"
						>
							Follow Topic
						</Button>
						<p
							style={{
								marginBottom: 0,
                textAlign:"center"
							}}
						>{`Followers ${topic.followers}`}</p>
					</Box>
				</Box>
				<Divider variant="inset" />
				<Box sx={{width:"100%"}} >
					<Questions questions={questions} />
				</Box>
			</Box>
		</Box>
	);
};

export default TopicDetail;
