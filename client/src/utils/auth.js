import { redirect } from "react-router-dom";
import { customToast } from "./customToast";
export const getTokenDuration = () => {
	const storedExpirationDate = sessionStorage.getItem("expiration");
	const expirationDate = new Date(storedExpirationDate);
	const now = new Date();
	const duration = expirationDate.getTime() - now.getTime();
	return duration;
};

export const getAuthToken = () => {
	const token = sessionStorage.getItem("token");

	if (!token) {
		return null;
	}

	const tokenDuration = getTokenDuration();
	if (tokenDuration < 0) {
		return "EXPIRED";
	}

	return token;
};

export const tokenLoader = () => {
	return getAuthToken();
};

export const authChecker = () => {
	if (!getAuthToken()) {
		console.log("not login yet")
		customToast({ type: "error", message: "Please login to continue" })
		return redirect("/login");
	}
	return null;
};


export const logoutUser = () => {
	sessionStorage.removeItem("token");
	sessionStorage.removeItem("expiration");
	sessionStorage.removeItem("user");
	window.location.href = "/login";
};