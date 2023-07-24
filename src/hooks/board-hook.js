import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { playerActions } from "../store";
import { useSpell } from "./spellCard-hook";
import { useAi } from "./Ai-hook";
import { useCalc } from "./calc-hook";

const useBoard = () => {
	const dispatch = useDispatch();
	const gameState = useSelector((state) => state.player);
	const { activateSpell } = useSpell();
	const { aiDrawCard, activateTrapCard, setAttackFalse, setTrapIsActiveTrueHandler, startTurn, turnIsInProgress } = useAi();
	const { battleCalculation } = useCalc();
	const [openTrap, setOpenTrap] = useState(false);

	useEffect(() => {
		console.log(gameState.attacker, gameState.attacker.owner, gameState.defender, gameState.defender.owner);

		if (gameState.attacker.owner && gameState.defender.owner) {
			console.log("use effect hook check");

			let p1HasTraps = false;
			for (const ts in gameState.player1.trapSlots) {
				if (gameState.player1.trapSlots[ts].isPlaying) {
					p1HasTraps = true;
				}
			}
			let p2HasTraps = false;
			for (const ts in gameState.player2.trapSlots) {
				if (gameState.player2.trapSlots[ts].isPlaying) {
					p2HasTraps = true;
				}
			}

			if (gameState.attacker.owner === "p2" && p1HasTraps) {
				setOpenTrap(true);
				if (gameState.aiPlaying) {
					setAttackFalse();
					setTrapIsActiveTrueHandler();
				}
			} else if (gameState.attacker.owner === "p1" && p2HasTraps) {
				if (gameState.aiPlaying) {
					console.log("ai activating trap card check!!!!");
					const { currentLifePoints, negate, usedCard } = activateTrapCard();
					if (!negate) {
						battleCalculation(currentLifePoints, negate);
					} else {
						dispatch(playerActions.setHasAttacked({ slotId: gameState.attacker.slot }));
					}
					dispatch(playerActions.clearAttackerDefender());
					dispatch(playerActions.clearFieldSlot({ slotIds: [usedCard.slot] }));
				} else {
					setOpenTrap(true);
				}
			} else {
				console.log("calc damage check");
				if (gameState.aiPlaying) {
					setAttackFalse();
				}
				battleCalculation();
			}
		}
	}, [dispatch, battleCalculation, gameState.attacker, gameState.defender, gameState.player1.trapSlots, gameState.player2.trapSlots, activateTrapCard, gameState.aiPlaying, setAttackFalse, setTrapIsActiveTrueHandler]);

	const battleSelectHandler = (card, slotId) => {
		console.log(card);
		if (gameState.gamePhases.battlePhase && !card.hasAttacked) {
			if (!card.owner) {
				console.log("assign lp to defender check");
				card = { owner: "lifePoints" };
			}
			console.log(card);
			dispatch(playerActions.battleSelect({ card, slotId }));
		}
	};

	const tributeSelectHandler = (card, slotId) => {
		if (gameState.player1.hasSummoned || gameState.player2.hasSummoned) {
			console.log("hassummed return check");
			return;
		}
		const player = gameState.player1.isTurn ? "p1" : "p2";

		console.log(slotId);
		console.log(card);
		console.log(gameState.selectedCard);

		if (gameState.canTributeSummon) {
			dispatch(playerActions.removeTributedCards());
			dispatch(playerActions.placeCard({ player: player, card: gameState.selectedCard }));
			dispatch(playerActions.setTributePrompt(false));
			return;
		}

		if (card.owner !== player) {
			// console.log(tributingPlayer);
			console.log("card owner !== trib player check");
			return;
		}

		// props.onAddClickedId(slotId);

		dispatch(playerActions.selectTributes({ card, slotId }));
	};

	const selectHandlers = (card, slotId) => {
		if (gameState.isTributing) {
			console.log("tribute select fn check", card, slotId);
			tributeSelectHandler(card, slotId);
		} else if (gameState.player1.isCastingSpell || gameState.player2.isCastingSpell) {
			console.log("cast check");
			if (card.owner === "p1") {
				console.log(gameState.player1.castingSpellCard, card);
				activateSpell(gameState.player1.castingSpellCard, card);
			} else if (card.owner === "p2") {
				activateSpell(gameState.player2.castingSpellCard, card);
			}
		} else {
			battleSelectHandler(card, slotId);
		}
	};

	const cancelTribute = () => {
		console.log("trib modal closed!!");
		dispatch(playerActions.setTributePrompt());
		dispatch(playerActions.setTributesToFalse());
		dispatch(playerActions.clearSelectedTributes());
	};

	const endTurnHandler = () => {
		if (gameState.gamePhases.drawPhase) {
			return;
		}
		dispatch(playerActions.endTurn());
		if (gameState.aiPlaying) {
			console.log("STARTING AI P2 TURN");
			aiDrawCard();
			setTimeout(() => {
				startTurn();
			}, 1000);
		}
	};

	const closeTrapCardDisplay = () => {
		setOpenTrap(false);
	};

	useEffect(() => {
		console.log(gameState.attacker, gameState.attacker.owner, gameState.defender, gameState.defender.owner);

		if (gameState.attacker.owner && gameState.defender.owner) {
			let p1HasTraps = false;
			for (const ts in gameState.player1.trapSlots) {
				if (gameState.player1.trapSlots[ts].isPlaying) {
					p1HasTraps = true;
				}
			}
			let p2HasTraps = false;
			for (const ts in gameState.player2.trapSlots) {
				if (gameState.player2.trapSlots[ts].isPlaying) {
					p2HasTraps = true;
				}
			}

			if (gameState.attacker.owner === "p2" && p1HasTraps) {
				setOpenTrap(true);
				if (gameState.aiPlaying) {
					setAttackFalse();
					setTrapIsActiveTrueHandler();
					console.log("P1 HAS TRAPS RETURN STATEMENT");
					return;
				}
			} else if (gameState.attacker.owner === "p1" && p2HasTraps) {
				if (gameState.aiPlaying) {
					console.log("ai activating trap card check!!!!");
					const { currentLifePoints, negate, usedCard } = activateTrapCard();
					if (!negate) {
						battleCalculation(currentLifePoints, negate);
					} else {
						dispatch(playerActions.setHasAttacked({ slotId: gameState.attacker.slot }));
					}
					dispatch(playerActions.clearAttackerDefender());
					dispatch(playerActions.clearFieldSlot({ slotIds: [usedCard.slot] }));
				} else {
					setOpenTrap(true);
				}
			} else {
				console.log("calc damage check");
				if (gameState.aiPlaying) {
					setAttackFalse();
				}
				battleCalculation();
			}
		}
	}, [dispatch, battleCalculation, gameState.attacker, gameState.defender, gameState.player1.trapSlots, gameState.player2.trapSlots, activateTrapCard, gameState.aiPlaying, setAttackFalse, setTrapIsActiveTrueHandler]);

	return {
		battleSelectHandler,
		tributeSelectHandler,
		selectHandlers,
		cancelTribute,
		endTurnHandler,
		openTrap,
		closeTrapCardDisplay,
	};
};

export default useBoard;
