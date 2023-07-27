import { createContext } from "react";

const AuthContext = createContext({
	isLoggedIn: false,
	userId: null,
	username: null,
	token: false,
	login: () => {},
	logout: () => {},
});

export default AuthContext;
