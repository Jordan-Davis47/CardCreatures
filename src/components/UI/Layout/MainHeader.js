import React, { useContext, useState } from "react";
import AuthContext from "../../../context/auth-context";

import Auth from "../../User/Auth";
import Button from "../Button";
import classes from "./MainHeader.module.css";

const MainHeader = (props) => {
	const auth = useContext(AuthContext);

	const showAuthHandler = () => {
		props.showAuth();
	};

	return (
		<div className={classes.header}>
			<h1>
				Card Creatures<span>v1</span>
			</h1>
			{!auth.isLoggedIn && (
				<Button className={classes.headerBtn} onClick={showAuthHandler}>
					Login
				</Button>
			)}
			{auth.isLoggedIn && (
				<Button
					className={classes.headerBtn}
					onClick={() => {
						auth.logout();
					}}
				>
					Logout
				</Button>
			)}
		</div>
	);
};

export default MainHeader;
