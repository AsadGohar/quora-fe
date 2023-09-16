import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import TopicItem from "../../components/TopicItem";

interface IProps {
	topics: any[];
}

const FollowTopics = (props: IProps) => {
	const { topics } = props;

	return (
		<List sx={{ width: "100%", maxWidth: 360, borderRadius: 3, pt: 0 }}>
			<ListItem
				alignItems="center"
				sx={{
					bgcolor: "#000",
					color: "white",
					borderRadius: 3,
					borderBottomLeftRadius: 0,
					borderBottomRightRadius: 0,
				}}
			>
				<ListItemText primary="Topics" />
			</ListItem>
			{topics.length > 0 ? (
				topics.map((item: any) => {
					return (
						<TopicItem
							key={item.id}
							id={item.id}
							title={item.title}
							image={item.picture}
						/>
					);
				})
			) : (
				<></>
			)}
		</List>
	);
};

export default FollowTopics;
