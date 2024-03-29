import { redirect } from "react-router-dom";
import { customToast } from "./customToast";
// export const getTokenDuration = () => {
// 	const storedExpirationDate = localStorage.getItem("expiration");
// 	const expirationDate = new Date(storedExpirationDate);
// 	const now = new Date();
// 	const duration = expirationDate.getTime() - now.getTime();
// 	return duration;
// };

export const getAuthToken = () => {
	const auth = localStorage.getItem("auth");
	const cookie = document.cookie
	if (!auth) {
		return null;
	}

	// const tokenDuration = getTokenDuration();
	// if (tokenDuration < 0) {
	// 	return "EXPIRED";
	// }

	return auth;
};

export const tokenLoader = () => {
	return getAuthToken();
};

export const authChecker = () => {
	if (!getAuthToken()) {
		console.log("not login yet")
		setTimeout(() => {
			customToast({ type: "error", message: "Please login to continue" })
		}, 1);
		return redirect("/login");
	}
	return null;
};