import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { playerActions } from "../store/index";

export const useCalc = () => {
	const dispatch = useDispatch();
	const p1LifePoints = useSelector((state) => state.player.player1.lifePoints);
	const p2LifePoints = useSelector((state) => state.player.player2.lifePoints);
	const attacker = useSelector((state) => state.player.attacker);
	const defender = useSelector((state) => state.player.defender);

	const damageCalculation = (currentLifePoints = null) => {
		let player1Life = p1LifePoints;
		let player2Life = p2LifePoints;
		if (currentLifePoints) {
			player1Life = currentLifePoints.p1 ? currentLifePoints.p1 : p1LifePoints;
			player2Life = currentLifePoints.p2 ? currentLifePoints.p2 : p2LifePoints;
		}
		console.log(currentLifePoints, player1Life, player2Life, p1LifePoints, p2LifePoints);

		let losingPlayer;
		let newLifePoints;
		let clearedSlot;
		let dmg;
		if (defender.owner === "lifePoints" && !attacker.hasAttacked) {
			if (attacker.owner === "p1") {
				losingPlayer = "p2";
				const lp = player2Life - attacker.atk;
				newLifePoints = lp;
				dispatch(playerActions.addToBattleLog({ directTarget: losingPlayer }));
				dispatch(playerActions.addToBattleLog({ player: losingPlayer, lostLp: attacker.atk }));
			} else if (attacker.owner === "p2" && !attacker.hasAttacked) {
				losingPlayer = "p1";
				const lp = player1Life - attacker.atk;
				newLifePoints = lp;
				dispatch(playerActions.addToBattleLog({ directTarget: losingPlayer }));
				dispatch(playerActions.addToBattleLog({ player: losingPlayer, lostLp: attacker.atk }));
			}
			return {
				losingPlayer,
				newLifePoints,
			};
		}
		// console.log("adding attacker n defender log below");
		// dispatch(playerActions.addToBattleLog());
		if (attacker.atk > defender.atk && defender.position === "atk" && !attacker.hasAttacked) {
			dmg = attacker.atk - defender.atk;
			if (defender.owner === "p1") {
				losingPlayer = "p1";
				const lp = player1Life - dmg;
				newLifePoints = lp;
				dispatch(playerActions.addToBattleLog({ player: losingPlayer, lostLp: dmg }));
			} else if (defender.owner === "p2") {
				losingPlayer = "p2";
				const lp = player2Life - dmg;
				newLifePoints = lp;

				dispatch(playerActions.addToBattleLog({ player: losingPlayer, lostLp: dmg }));
			}
			clearedSlot = [defender.slot];
		} else if (attacker.atk < defender.atk && defender.position === "atk" && !attacker.hasAttacked) {
			console.log("atk weaker check");
			dmg = defender.atk - attacker.atk;
			if (attacker.owner === "p1") {
				losingPlayer = "p1";
				const lp = player1Life - dmg;
				newLifePoints = lp;

				dispatch(playerActions.addToBattleLog({ player: losingPlayer, lostLp: dmg }));
			} else if (attacker.owner === "p2") {
				losingPlayer = "p2";
				const lp = player2Life - dmg;
				newLifePoints = lp;

				dispatch(playerActions.addToBattleLog({ player: losingPlayer, lostLp: dmg }));
			}
			clearedSlot = [attacker.slot];
		} else if (attacker.atk === defender.atk && defender.position === "atk" && !attacker.hasAttacked) {
			dmg = 0;
			losingPlayer = "both";
			newLifePoints = null;
			clearedSlot = [attacker.slot, defender.slot];
		} else if (attacker.atk > defender.def && defender.position === "def" && !attacker.hasAttacked) {
			clearedSlot = [defender.slot];
		} else if (attacker.atk < defender.def && defender.position === "def" && !attacker.hasAttacked) {
			dmg = defender.def - attacker.atk;
			if (attacker.owner === "p1") {
				losingPlayer = "p1";
				const lp = player1Life - dmg;
				newLifePoints = lp;
				dispatch(playerActions.addToBattleLog({ player: losingPlayer, lostLp: dmg }));
			} else if (attacker.owner === "p2") {
				losingPlayer = "p2";
				const lp = player2Life - dmg;
				newLifePoints = lp;

				dispatch(playerActions.addToBattleLog({ player: losingPlayer, lostLp: dmg }));
			}
		} else if (attacker.atk === defender.def && defender.position === "def" && !attacker.hasAttacked) {
			losingPlayer = null;
			newLifePoints = null;
			clearedSlot = null;
		}
		return {
			losingPlayer,
			newLifePoints,
			clearedSlot,
		};
	};

	const battleCalculation = (currentLifePoints = null, negate = false) => {
		console.log(attacker.hasAttacked);
		console.log(attacker, defender, negate);
		if (!attacker.hasAttacked) {
			console.log("adding attacker n defender log below");
			dispatch(playerActions.addToBattleLog());
			const { losingPlayer, newLifePoints, clearedSlot } = damageCalculation(currentLifePoints);
			console.log(losingPlayer, newLifePoints, clearedSlot, currentLifePoints);
			if (newLifePoints) {
				if (currentLifePoints) {
					console.log("current lifeponts check reached");
					let lifePoints;

					if (currentLifePoints.p1 && !currentLifePoints.p2 && losingPlayer === "p1") {
						lifePoints = currentLifePoints.p1;
					} else if (!currentLifePoints.p1 && currentLifePoints.p2 && losingPlayer === "p2") {
						lifePoints = currentLifePoints.p2;
					} else if (currentLifePoints.p1 && currentLifePoints.p2 && losingPlayer === "both") {
						lifePoints = currentLifePoints;
					} else {
						lifePoints = newLifePoints;
					}

					dispatch(playerActions.updatePlayerLife({ player: losingPlayer, newLifePoints: lifePoints }));
				} else {
					console.log("current lp else block reacheded");
					dispatch(playerActions.updatePlayerLife({ player: losingPlayer, newLifePoints }));
				}
			}
			if (clearedSlot && !negate) {
				dispatch(playerActions.clearFieldSlot({ slotIds: clearedSlot }));
			}
			dispatch(playerActions.setHasAttacked({ slotId: attacker.slot }));
		}
		// if (attacker & defender) {
		dispatch(playerActions.clearAttackerDefender());
		// }
	};

	return {
		battleCalculation,
	};
};
