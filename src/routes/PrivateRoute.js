import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ children }) => {
	const location = useLocation();
	const { user, loading } = useSelector(state => state.user);

	if (!user && loading === false) {
		return (
			<Navigate to={"/auth/login"} state={{ from: location }} replace>
				{children}
			</Navigate>
		);
	}

	return children;
};
export default PrivateRoute;
