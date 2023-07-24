import React, { Fragment } from "react";

import Button from "../Button";
import classes from "./MainMenu.module.css";

const MainMenu = (props) => {
	return (
		<div className={classes.mainMenu}>
			<Button onClick={props.openHowToPlay} className={`${classes.item} ${classes.header}`}>
				HOW TO PLAY
			</Button>
			<Button onClick={props.openComingSoon} className={`${classes.item} ${classes.sidebar}`}>
				COMING SOON
			</Button>
			<Button onClick={props.nextMenu} className={`${classes.item} ${classes.content1}`}>
				START DUEL
			</Button>
			<Button onClick={props.openDecksMenu} className={`${classes.item} ${classes.content2}`}>
				DECKS
			</Button>
			<Button onClick={props.openFeatures} className={`${classes.item} ${classes.content3}`}>
				FEATURES
			</Button>
			<Button onClick={props.openLeaderboard} className={`${classes.item} ${classes.footer}`}>
				LEADERBOARD
			</Button>
		</div>
	);
};

export default MainMenu;
