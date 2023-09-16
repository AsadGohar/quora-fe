import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { RootState, useAppDispatch } from "../redux/store";
import { useSelector } from "react-redux";
import { Box } from "@mui/material";
import { logout } from "../redux/slices/user.slice";
import { useNavigate, NavLink } from "react-router-dom";
import Logo from "./Logo";
import { Size } from "../utils/enums";

const Navbar = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const user = useSelector((state: RootState) => state.user);
	const logoutUser = () => {
		dispatch(logout());
		navigate("/");
	};

	if(!user.data?.email){
		return null
	}

	return (
		<AppBar
			position="fixed"
			elevation={0}
			sx={{
				zIndex: (theme) => theme.zIndex.drawer + 1,
				bgcolor: "#fff",
				height: "50px",
			}}
		>
			<Toolbar
				sx={{
					justifyContent: "space-between",
					alignItems: "flex-start",
				}}
			>
				<NavLink to="/home">
					<Logo size={Size.SMALL} />
				</NavLink>
				<Box sx={{ display: "flex", flexDirection: "row" }}>
					<NavLink className="nav-link" to={"/add/topic"}>
						ADD TOPIC
					</NavLink>
					<NavLink className="nav-link" to={"/about"}>
						ABOUT
					</NavLink>
					<Box onClick={() => logoutUser()} className="nav-link-logout">
						LOGOUT
					</Box>
				</Box>
			</Toolbar>
		</AppBar>
	);
};

export default Navbar;
