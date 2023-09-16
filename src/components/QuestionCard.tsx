import React from "react";
import { Avatar, TextField } from "@mui/material";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import AnswerCard from "./AnswerCard";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";

import { Box } from "@mui/material";
interface IProps {
	name: string;
	body: string;
	isLiked?: boolean | null;
	likes: number;
	isDisliked?: boolean | null;
	dislikes: number;
	date: string;
	picture: string | null;
	answers: any[];
}

const QuestionCard = (props: IProps) => {
	const {
		name,
		body,
		answers,
		likes,
		dislikes,
		isLiked,
		isDisliked,
		date,
		picture,
	} = props;
	const [answer, setAnswer] = React.useState("");
	return (
		<Card
			sx={{ width: "100%", minWidth: "300px", pl: 0, borderRadius: 3 }}
		>
			<CardContent>
				<Box
					sx={{
						display: "flex",
						justifyContent: "space-between",
						alignItems: "center",
					}}
				>
					<Box>
						<Box
							sx={{
								display: "flex",
								alignItems: "end",
								mb: 1,
							}}
						>
							<Avatar src={picture ? picture : "/images/placeholder.jpg"} />
							<Typography
								sx={{
									fontSize: 17,
									fontWeight: "bold",
									"&:hover": {
										cursor: "pointer",
									},
								}}
								color="text.primary"
								gutterBottom
							>
								{name}
							</Typography>
						</Box>
						<Typography variant="body2">{body}</Typography>
					</Box>
					<Box
						sx={{
							height: "55px",
							mt: 2,
							display: "flex",
							flexDirection: "column",
							justifyContent: "space-between",
						}}
					>
						<Typography
							sx={{ fontSize: 12, fontStyle: "italic", mt: 0 }}
							color="text.secondary"
							gutterBottom
						>
							{date}
						</Typography>
						<Box sx={{ display: "flex" }}>
							<Box>
								{isLiked ? (
									<>
										<ThumbUpAltIcon fontSize="small" sx={{ color: "green" }} />{" "}
										{likes}
									</>
								) : (
									<>
										<ThumbUpOffAltIcon
											fontSize="small"
											sx={{ color: "green" }}
										/>{" "}
										{likes}
									</>
								)}
							</Box>
							<Box sx={{ ml: 1 }}>
								{isDisliked ? (
									<>
										<ThumbDownAltIcon fontSize="small" sx={{ color: "red" }} />{" "}
										{dislikes}
									</>
								) : (
									<>
										<ThumbDownOffAltIcon
											fontSize="small"
											sx={{ color: "red" }}
										/>{" "}
										{dislikes}
									</>
								)}
							</Box>
						</Box>
					</Box>
				</Box>
			</CardContent>
			<hr />
			<CardContent sx={{bgcolor:"#F1F2F2"}}>
				{answers.length > 0 ? (
					answers.map((item) => {
						return (
							<AnswerCard
								isDisliked={false}
								dislikes={14}
								likes={4}
								isLiked={item?.isLiked}
								body={item?.body}
							/>
						);
					})
				) : (
					<p>No Answers Yet!</p>
				)}
			</CardContent>
			<CardActions sx={{pb:2}}>
				<TextField
					fullWidth
					name="body"
					label="Answer"
					value={answer}
					onChange={(e: any) => setAnswer(e.target.value)}
					size="small"
					sx={{ mr: 1 }}
					inputProps={{
						style: {
							fontSize: "13px",
						},
					}}
				/>
				<Button
					sx={{
						fontWeight: "bold",
						bgcolor: "#b92b27",
						"&:hover": {
							backgroundColor: "#000",
						},
					}}
					size="medium"
					type="submit"
					variant="contained"
				>
					Answer
				</Button>
			</CardActions>
		</Card>
	);
};

export default QuestionCard;
