import { ReactNode } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { RootState } from "../redux/store";

interface IProps {
	children?: ReactNode;
}

const ProtectedRoute = ({ children }: IProps) => {
	const user: any = useSelector(
		(state: RootState) => state.user || localStorage.getItem(user)
		);
	if (!user.data) {
		return <Navigate to="/" replace />;
	}
	return children;
};
export default ProtectedRoute;
