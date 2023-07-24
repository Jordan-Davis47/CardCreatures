import { useState, useEffect, useCallback } from "react";

let logoutTimer;

export const useAuth = () => {
	const [token, setToken] = useState(false);
	const [tokenExpirationDate, setTokenExpirationDate] = useState();
	const [userId, setUserId] = useState(false);
	const [username, setUsername] = useState(false);

	const login = useCallback((authObj) => {
		console.log(token);
		setToken(token);
		setUserId(authObj.userId);
		setUsername(authObj.username);
		const tokenExpirationDate = authObj.expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60);
		setTokenExpirationDate(tokenExpirationDate);
		localStorage.setItem("userData", JSON.stringify({ userId: authObj.userId, username: authObj.username, token: authObj.token, expiration: tokenExpirationDate.toISOString() }));
	}, []);

	useEffect(() => {
		const storedData = JSON.parse(localStorage.getItem("userData"));
		if (storedData && storedData.token && new Date(storedData.expiration) > new Date()) {
			login(storedData.userId, storedData.token, storedData.username, new Date(storedData.expiration));
		}
	}, [login]);

	const logout = useCallback(() => {
		setToken(null);
		setTokenExpirationDate(null);
		setUserId(null);
		setUsername(null);
		localStorage.removeItem("userData");
	}, []);

	useEffect(() => {
		if (token && tokenExpirationDate) {
			const remainingTime = tokenExpirationDate.getTime() - new Date().getTime();
			logoutTimer = setTimeout(logout, remainingTime);
		} else {
			clearTimeout(logoutTimer);
		}
	}, [token, logout, tokenExpirationDate]);

	return { token, login, logout, userId, username };
};
