import React from "react";
import Card from "../Card";
import { useSelector } from "react-redux";

import ChevronDoubleRightIcon from "../../icons/ChevronDoubleRight";

import classes from "./BattleViewer.module.css";

const BattleViewer = () => {
	const state = useSelector((state) => state.player);

	return (
		<div className={classes.container}>
			<div>
				<Card name={state.attacker.name} atk={state.attacker.atk} def={state.attacker.def} src={state.attacker.img} position={state.attacker.position} type={state.attacker.type} />
			</div>
			<div className={classes.middleContainer}>
				<ChevronDoubleRightIcon />
				<ChevronDoubleRightIcon />
				<ChevronDoubleRightIcon />
				<ChevronDoubleRightIcon />
			</div>
			<div>
				<Card name={state.defender.name} atk={state.defender.atk} def={state.defender.def} src={state.defender.img} position={state.defender.position} type={state.defender.type} />
			</div>
		</div>
	);
};

export default BattleViewer;
