import React from "react";

import classes from "./Features.module.css";
import Container from "../Layout/Container";
import Button from "../Button";

const Features = (props) => {
	return (
		<Container className={classes.featuresContainer}>
			<h2 className={classes.title}>Game Features</h2>

			<ul className={classes.list}>
				<p>Create your own duel account</p>
				<li>Keep track of your wins and score!</li>
				<li>Create and save new decks with your own custom cards!</li>
			</ul>

			<ul className={classes.list}>
				<p>Play Duels</p>
				<li>Play single or multiplayer duels!</li>
				<li>Earn points with each duel to increase your ranking in the leaderboard and improve your decks!</li>
			</ul>
			<ul className={classes.list}>
				<p>Custom Decks</p>
				<li>Power up your cards by winning duels against a friend or the computer!</li>
				<li>Create your own monster, spell and trap cards!</li>
				<li>Upload your own images to use with your custom cards, create decks for your favourite show, characters or even your family or friends!</li>
			</ul>
			<Button onClick={props.onBack} backBtn>
				Main Menu
			</Button>
		</Container>
	);
};

export default Features;
