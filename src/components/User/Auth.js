import React, { useState } from "react";

import Login from "../UI/Forms/Login";
import SignUp from "../UI/Forms/SignUp";
import Button from "../UI/Button";
import classes from "./Auth.module.css";

const Auth = (props) => {
	const [signUpMode, setSignUpMode] = useState(true);

	function switchModeHandler() {
		setSignUpMode((prevState) => !prevState);
	}
	return (
		<div className={classes.container}>
			{signUpMode && <SignUp closeForm={props.closeForm} />}
			{!signUpMode && <Login closeForm={props.closeForm} />}
			<Button type="button" className={classes.switchBtn} onClick={switchModeHandler}>
				{signUpMode ? "Already have an account? Login" : "Dont have an account yet? Sign up"}
			</Button>
			<Button type="button" backBtn onClick={props.closeForm} className={classes.backBtn}>
				Back
			</Button>
		</div>
	);
};

export default Auth;
