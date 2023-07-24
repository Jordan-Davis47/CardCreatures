import React from "react";
import { useSelector } from "react-redux";

import classes from "./BattleLog.module.css";
import Button from "./Button";

const BattleLog = (props) => {
	const battleLog = useSelector((state) => state.player.battleLog);

	const containerClass = props.inMenu ? classes.inMenuContainer : classes.boardContainer;

	const uniqueLogs = [];
	battleLog.forEach((log) => {
		// if (!uniqueLogs.includes(log)) {
		// 	uniqueLogs.push(log);
		// }
		if (uniqueLogs[uniqueLogs.length - 2] !== log) {
			uniqueLogs.push(log);
		}
	});

	return (
		<div className={containerClass}>
			<h2 className={classes.header}>Battle Log</h2>
			<div className={classes.logs}>
				{uniqueLogs
					.filter((log) => !log.includes("undefined"))
					.map((log, index) => (
						<p key={index}>{log}</p>
					))}
			</div>
			{props.inMenu && (
				<Button backBtn className={classes.inMenuBtn} onClick={props.onBack}>
					Back
				</Button>
			)}
		</div>
	);
};

export default BattleLog;
