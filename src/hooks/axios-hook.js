import { useState, useCallback } from "react";
import axios from "axios";

export const useAxios = () => {
	const [isLoading, setIsLoading] = useState();
	const [error, setError] = useState(null);
	const [message, setMessage] = useState(null);

	const sendRequest = useCallback(async (url, method, body = null, headers = null) => {
		try {
			setIsLoading(true);
			const response = await axios[method](url, body, headers);

			if (!response.status) {
				console.log("DAMN ERROR IF CHECK WORKED");

				throw new Error(response.message);
			}
			setMessage(response.data.message);
			setIsLoading(false);
			return response;
		} catch (err) {
			setError(err.message);
			setIsLoading(false);
			throw err;
		}
	}, []);

	const clearError = () => {
		setError(null);
	};

	const clearMessage = () => {
		setMessage(null);
	};

	return {
		isLoading,
		error,
		sendRequest,
		clearError,
		message,
		clearMessage,
	};
};
