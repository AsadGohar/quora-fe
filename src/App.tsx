import { Route, Routes, useLocation } from "react-router-dom";
// import ProtectedRoute from "./routes/ProtectedRoute";
import PageNotFound from "./components/PageNotFound";
import { Login } from "./containers/Login";
import Navbar from "./components/Navbar";
import Home from "./containers/Home";
import React from "react";
import "./App.css";
import AddTopic from "./containers/AddTopic";
import TopicDetail from "./containers/TopicDetail";
import ProtectedRoute from "./routes/ProtectedRoute";

function App() {
	const location = useLocation();
	React.useEffect(() => {
		if (location.pathname === "/") {
			document.body.style.backgroundImage = "url(/images/bg-1.jfif)";
			document.body.style.backgroundSize = "cover";
		} else {
			document.body.style.backgroundImage = "none";
			document.body.style.backgroundColor = "#F1F2F2";
		}
	}, [location]);
	return (
		<>
			<Navbar />
			<Routes>
				<Route path="/" element={<Login />} />
				<Route
					path="/home"
					element={
						<ProtectedRoute>
							<Home />
						</ProtectedRoute>
					}
				></Route>
				<Route
					path="/add/topic"
					element={
						<ProtectedRoute>
							<AddTopic />
						</ProtectedRoute>
					}
				></Route>
				<Route path="/question/:id" element={<Home />}></Route>
				<Route path="/topic/:id" element={<TopicDetail />}></Route>
				<Route path="/user/:id" element={<Home />}></Route>
				<Route path="/about" element={<Home />}></Route>
				<Route path="*" element={<PageNotFound />} />
			</Routes>
		</>
	);
}

export default App;
