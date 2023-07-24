import React, { Fragment, useState } from "react";
import { useSelector } from "react-redux";

import classes from "./Tooltips.module.css";

const Tooltips = (props) => {
	const state = useSelector((state) => state.player);
	const [currentMessage, setCurrentMessage] = useState();
	const [nextTip, setNextTip] = useState(false);
	console.log(state.attacker);

	let message;
	console.log(state.gamePhases);

	if (state.gamePhases.summonPhase) {
		message = "Choose a card to summon or activate!";
	}

	if (state.isTributing) {
		message = "Choose a card to tribute";
	}

	if (state.gamePhases.battlePhase && !state.attacker.owner) {
		message = "Choose your card to battle!";
	} else if (state.gamePhases.battlePhase && state.attacker.owner) {
		message = "Choose a target to attack!";
	}

	if (state.gamePhases.drawPhase) {
		message = "Draw a card";
	}
	return (
		<Fragment>
			<div className={classes.container}>
				<p>{state.player1.isTurn ? "Player 1" : "Player 2"}</p>
				<p>{message}</p>
			</div>
		</Fragment>
	);
};

export default Tooltips;
