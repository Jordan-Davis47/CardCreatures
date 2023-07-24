import { useContext } from "react";

import { useSelector, useDispatch } from "react-redux";
import { playerActions } from "../../store/index";
import classes from "./PhaseHeader.module.css";

import AuthContext from "../../context/auth-context";

const PhaseHeader = (props) => {
	const auth = useContext(AuthContext);
	const state = useSelector((state) => state.player);
	let phase;
	if (state.gamePhases.drawPhase) {
		phase = "Draw Phase";
	} else if (state.gamePhases.battlePhase) {
		phase = "Battle Phase";
	} else if (state.gamePhases.summonPhase) {
		phase = "Summon Phase";
	}

	return (
		<div>
			<h2 className={classes.header}>{phase}</h2>
			<h2 className={classes.turn}>Turn: {state.gamePhases.turn}</h2>
		</div>
	);
};

export default PhaseHeader;
