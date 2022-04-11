import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import Preloader from "../components/Preloader/Preloader";
import { useAuth } from "../store/AuthProvider";

function PrivateRoute({ redirectURI, forGuests, children }) {
	const { isAuthenticated, isTokenRefreshing } = useAuth();
	const hasPermission = forGuests ? !isAuthenticated : isAuthenticated;
	let location = useLocation();
	if (isTokenRefreshing) {
		return <Preloader />;
	}
	return (
		<div>
			{hasPermission ? (
				children
			) : (
				<Navigate to={redirectURI} state={{ from: location }} replace />
			)}
		</div>
	);
}

export default PrivateRoute;
