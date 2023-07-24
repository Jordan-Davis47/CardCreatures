import React from "react";

import classes from "./ComingSoon.module.css";
import Container from "../Layout/Container";
import Button from "../Button";

const ComingSoon = (props) => {
	return (
		<Container className={classes.featuresContainer}>
			<h2 className={classes.title}>Future Updates</h2>
			<ul className={classes.list}>
				<li>Upload your deck for other users to try!</li>
				<li>Improved AI opponents with difficulty settings!</li>
				<li>Enhanced duel UI!</li>
				<li>All new spell and trap card types!</li>
				<li>All new monster cards!</li>
				<li>Effect monsters! Adding a new layer of strategy</li>
			</ul>
			<Button onClick={props.onBack} backBtn>
				Main Menu
			</Button>
		</Container>
	);
};

export default ComingSoon;
