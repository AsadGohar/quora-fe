import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import { Link } from "react-router-dom";

interface IProps {
	id: string;
	title: string;
	image: string;
}

const TopicItem = (props: IProps) => {
	const { title, image, id } = props;
	return (
		<Link
			to={`/topic/${id}`}
			className="topic-link"
		>
			<ListItem alignItems="center" sx={{ bgcolor: "white", "&:hover":{
				backgroundColor:"#e6e6e6"
			} }}>
				<ListItemAvatar>
					<Avatar src={image} />
				</ListItemAvatar>
				<ListItemText primary={title} />
			</ListItem>
		</Link>
	);
};

export default TopicItem;
