import { Button } from "@mui/material";
import { Link } from "react-router-dom";

const PageNotFound = () => {
	return (
		<div style={{margin:"0 100px"}} className="py-4 bg-white rounded ">
			<div className="container jumbotron mt-4">
				<h1 className="display-4">404 Page Not Found!</h1>
				<p className="lead">
					The page you are trying to access is not available right now.{" "}
				</p>
				<hr className="my-4" />
				<p className="lead">
					<Link to="/" role="button">
						{" "}
						<Button
							sx={{
								marginTop: "10px",
								fontWeight: "bold",
								maxWidth:"300px",
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
							Go To Login
						</Button>
					</Link>
				</p>
			</div>
		</div>
	);
};

export default PageNotFound;
