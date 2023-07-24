import Modal from "./Modal";

import { useState } from "react";
import BattleLog from "./BattleLog";

import classes from "./InGameMenu.module.css";

const InGameMenu = (props) => {
	const [showBattleLog, setShowBattleLog] = useState(false);
	const phase = props.drawPhase ? "Draw Phase" : props.summonPhase ? "Summon Phase" : props.battlePhase ? "Battle Phase" : "";
	const currentPhase = `Phase: ${phase}`;
	const currentTurn = `Turn: ${props.turn}`;

	return (
		<Modal onClose={props.onCloseMenu}>
			{!showBattleLog && (
				<div className={classes.menu}>
					<div className={classes.matchInfo}>
						<h3 className={classes.currentTurn}>{currentTurn}</h3>
						<h3 className={classes.currentPhase}>{currentPhase}</h3>
					</div>
					<div
						className={classes.menuBar}
						onClick={() => {
							setShowBattleLog(true);
						}}
					>
						<p>Battle Log</p>
					</div>
					<div className={classes.menuBar} onClick={props.onBattlePhase}>
						<p className={classes.battlePhaseBar}>Enter Battle Phase</p>
					</div>
					<div className={classes.menuBar} onClick={props.onEndTurn}>
						<p className={classes.endTurnBar}>End Turn</p>
					</div>
					<div className={classes.menuBar} onClick={props.onCloseMenu}>
						<p className={classes.closeMenuBar}>Close Menu</p>
					</div>
					<div className={classes.menuBar} onClick={props.onQuitGame}>
						<p className={classes.quitGameBar}>Quit Game</p>
					</div>
				</div>
			)}
			{showBattleLog && (
				<BattleLog
					inMenu={true}
					onBack={() => {
						setShowBattleLog(false);
					}}
				/>
			)}
		</Modal>
	);
};

export default InGameMenu;
