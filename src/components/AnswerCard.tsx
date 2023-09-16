import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
interface IProps {
	body: string;
	isLiked: boolean;
	likes: number;
	isDisliked?: boolean | null;
	dislikes: number;
}

const AnswerCard = (props: IProps) => {
	const { body, isLiked, likes, isDisliked, dislikes } = props;
	return (
		<Card sx={{ width:"100%" }}>
			<CardContent >
				<Box sx={{ display: "flex", justifyContent: "space-between", pb:0 }}>
					<Typography variant="body2" color="text.secondary">
						{body}
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
									<ThumbUpOffAltIcon fontSize="small" sx={{ color: "green" }} />{" "}
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
									<ThumbDownOffAltIcon fontSize="small" sx={{ color: "red" }} />{" "}
									{dislikes}
								</>
							)}
						</Box>
					</Box>
				</Box>
			</CardContent>
		</Card>
	);
};

export default AnswerCard;
