import { useContext } from "react";
import NotificationContext from "../context/notification-context";

const useNotification = () => {
	const notificationCtx = useContext(NotificationContext);

	const showSuccess = (configObj) => {
		notificationCtx.showNotification({ title: configObj.title, message: configObj.message, status: "success" });
	};

	const showError = (configObj) => {
		notificationCtx.showNotification({ title: configObj.title, message: configObj.message, status: "error" });
	};

	const showPending = (configObj) => {
		notificationCtx.showNotification({ title: configObj.title, message: configObj.message, status: "pending" });
	};
	return {
		showError,
		showSuccess,
		showPending,
	};
};

export default useNotification;
