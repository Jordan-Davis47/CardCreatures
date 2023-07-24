import React from "react";
import Button from "./Button";

import classes from "./PopUpBox.module.css";

const PopUpBox = (props) => {
	return (
		<div className={`${classes.pad} ${classes.z} ${classes.a} ${classes.b}`} onClick={props.onClose}>
			<div className={classes.content}>
				<p>{props.message}</p>
			</div>
			<Button onClick={props.onClose} backBtn>
				Close
			</Button>
		</div>
	);
};

export default PopUpBox;
