import React, { useContext } from "react";
import MainHeader from "./MainHeader";
import Notification from "../../UI/Notification";
import NotificationContext from "../../../context/notification-context";
import { useAuth } from "../../../hooks/auth-hook";
import AuthContext from "../../../context/auth-context";

const Layout = (props) => {
	const { login, logout, userId, username, token } = useAuth();
	const notiCtx = useContext(NotificationContext);

	const activeNotification = notiCtx.notification;

	const isLoggedIn = token ? true : false;

	return (
		<AuthContext.Provider value={{ isLoggedIn, userId, username, login, logout, token: token }}>
			{props.showHeader && <MainHeader showAuth={props.showAuth} />}
			<main>{props.children}</main>
			{activeNotification && <Notification title={activeNotification.title} message={activeNotification.message} status={activeNotification.status} />}
		</AuthContext.Provider>
	);
};

export default Layout;
