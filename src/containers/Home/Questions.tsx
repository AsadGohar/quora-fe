import React from "react";
import { Grid, Box } from "@mui/material";
import QuestionCard from "../../components/QuestionCard";
interface IProps {
	questions: any[];
}

export const Questions = React.memo((props: IProps) => {
	const { questions } = props;

	return (
		<>
			{questions.length > 0 ? (
				<Grid sx={{ ml: 0 }} container>
					{questions.map((item: any) => (
						<Grid
							sx={{ mb: 2 }}
							key={item?.id}
							item
							lg={12}
							md={12}
							sm={12}
							xs={12}
						>
							<QuestionCard
								key={item.id}
								picture={item.author.picture}
								date={String(item.createdAt).slice(0, 10)}
								likes={item.likeCount}
								dislikes={item.dislikes}
								isLiked={item.isLiked || true}
								isDisliked={item.isDisliked || true}
								name={item?.author.name}
								body={item?.body}
								answers={item?.answers}
							/>
						</Grid>
					))}
				</Grid>
			) : (
				<Box sx={{ bgcolor: "white", p: 2, mt: 2, borderRadius: 3 }}>
					<p>there are no questions at the moment 😔</p>
				</Box>
			)}
		</>
	);
});
