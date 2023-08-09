import React, { useState, useEffect, useCallback, useMemo } from "react";

import { useSelector, useDispatch, useStore } from "react-redux";
import { playerActions } from "../store/index";

import { useSpell } from "./spellCard-hook";
import { useCalc } from "./calc-hook";

export const useAi = () => {
	const dispatch = useDispatch();
	const { activateSpell } = useSpell();
	const player1 = useSelector((state) => state.player.player1);
	const player2 = useSelector((state) => state.player.player2);
	const state = useSelector((state) => state.player);
	const [prevSelectedTarget, setPrevSelectedTarget] = useState(null);
	const [battles, setBattles] = useState(null);
	const [numberOfBattles, setNumberOfBattles] = useState(0);
	const [isBattling, setIsBattling] = useState(false);
	const [turnIsInProgress, setTurnIsInProgress] = useState(false);
	const [AiBattlePhase, setAiBattlePhase] = useState(false);
	const [attackInProgress, setAttackInProgress] = useState(false);
	const [trapIsActive, setTrapIsActive] = useState(false);
	const [hasAttackedLp, setHasAttackedLp] = useState(false);

	let currentP2Hand = [];
	let currentP1Hand = [];
	let currentp1Field = [];
	let currentp2Field = [];

	const setTrapIsActiveTrueHandler = () => {
		setTrapIsActive(true);
		console.log("setting trap to true", trapIsActive);
	};

	const setTrapIsActiveFalseHandler = () => {
		setTrapIsActive(false);
		console.log("setting trap to false", trapIsActive);
	};

	const setAttackFalse = () => {
		setAttackInProgress(false);
	};

	const setAttackTrue = () => {
		setAttackInProgress(true);
	};

	const chooseMonsterCard = () => {
		console.log("choose monster card ai fn launched");
		//reducer to determine the highest stat//
		const reducer = (sum, value) => {
			return sum > value ? sum : value;
		};
		let cards;
		if (currentP2Hand.length) {
			cards = currentP2Hand.filter((card) => card.type === "monster");
		} else {
			cards = player2.hand.filter((card) => card.type === "monster");
		}
		let possibleTributes = [];
		if (currentp2Field.length) {
			possibleTributes = currentp2Field.filter((card) => card.id && card.tributesRequired !== 2);
		} else {
			possibleTributes = [player2.fieldSlots.fs1, player2.fieldSlots.fs2, player2.fieldSlots.fs3].filter((card) => card.id && card.tributesRequired !== 2);
		}
		console.log(possibleTributes);
		//check if a monster card requiring 2 tributes is available & there are enough cards on the field to tribute//
		const twoTributeMonster = cards.find((card) => card.tributesRequired === 2);
		if (twoTributeMonster && possibleTributes.length >= 2) {
			console.log("2 trib monster fn check");
			const card = twoTributeMonster.atk > twoTributeMonster.def || twoTributeMonster.atk === twoTributeMonster.def ? { ...twoTributeMonster, position: "atk" } : { ...twoTributeMonster, position: "def" };
			console.log(card);
			return card;
		}
		//check if a monster card requiring 1 tribute is available & there are enough cards on the field to tribute//
		const oneTributeMonster = cards.find((card) => card.tributesRequired === 1);
		if (oneTributeMonster) {
			possibleTributes = possibleTributes.filter((card) => !card.tributesRequired);
		}
		console.log("filetered", possibleTributes);
		console.log(oneTributeMonster);
		if (oneTributeMonster && possibleTributes.length >= 1) {
			console.log("1 trib monster fn check");

			const card = oneTributeMonster.atk > oneTributeMonster.def || oneTributeMonster.atk === oneTributeMonster.def ? { ...oneTributeMonster, position: "atk" } : { ...oneTributeMonster, position: "def" };
			console.log(card);
			return card;
		}
		//chooses a monster card that requires no tributes to use by finding the card with the highest stat//
		let statNumbers = [];
		const stats = cards.map((card) => (!card.tributesRequired ? [card.atk, card.def] : ""));
		console.log("stats", stats);
		stats.forEach((array) => (statNumbers = [...statNumbers, ...array]));
		const highStat = statNumbers.reduce(reducer, 0);
		const strongestCard = cards.find((card) => (card.atk === highStat && !card.tributesRequired ? true : card.def === highStat && !card.tributesRequired ? true : false));
		console.log(strongestCard);
		if (!strongestCard) {
			console.log("NO CARD FOUND RETURN CHECK");
			return;
		}
		const card = strongestCard.def > strongestCard.atk ? { ...strongestCard, position: "def" } : { ...strongestCard, position: "atk" };

		console.log(stats, highStat, card);
		return card;
	};

	const chooseTributes = (card) => {
		console.log("CHOOSE TRIBUTES FN STARTING");
		const tributes = [];
		if (currentp2Field.length) {
			const fs1Card = currentp2Field.find((card) => card.slot === "p2s1");
			if (fs1Card) {
				if ((fs1Card.tributesRequired !== 2 || !fs1Card.tributesRequired) && tributes.length !== card.tributesRequired && !(card.tributesRequired === 1 && fs1Card.tributesRequired === 1)) {
					tributes.push(fs1Card);
				}
			}
		} else if (
			player2.fieldSlots.fs1.isPlaying &&
			(player2.fieldSlots.fs1.tributesRequired !== 2 || !player2.fieldSlots.fs1.tributesRequired) &&
			tributes.length !== card.tributesRequired &&
			!(card.tributesRequired === 1 && player2.fieldSlots.fs1.tributesRequired === 1)
		) {
			tributes.push(player2.fieldSlots.fs1);
		}

		if (currentp2Field.length) {
			const fs2Card = currentp2Field.find((card) => card.slot === "p2s2");
			if (fs2Card) {
				if ((fs2Card.tributesRequired !== 2 || !fs2Card.tributesRequired) && tributes.length !== card.tributesRequired && !(card.tributesRequired === 1 && fs2Card.tributesRequired === 1)) {
					tributes.push(fs2Card);
				}
			}
		} else if (
			player2.fieldSlots.fs2.isPlaying &&
			(player2.fieldSlots.fs2.tributesRequired !== 2 || !player2.fieldSlots.fs2.tributesRequired) &&
			tributes.length !== card.tributesRequired &&
			!(card.tributesRequired === 1 && player2.fieldSlots.fs2.tributesRequired === 1)
		) {
			tributes.push(player2.fieldSlots.fs2);
		}
		if (currentp2Field.length) {
			const fs3Card = currentp2Field.find((card) => card.slot === "p2s3");
			if (fs3Card) {
				if ((fs3Card.tributesRequired !== 2 || !fs3Card.tributesRequired) && tributes.length !== card.tributesRequired && !(card.tributesRequired === 1 && fs3Card.tributesRequired === 1)) {
					tributes.push(fs3Card);
				}
			}
		} else if (
			player2.fieldSlots.fs3.isPlaying &&
			(player2.fieldSlots.fs3.tributesRequired !== 2 || !player2.fieldSlots.fs3.tributesRequired) &&
			tributes.length !== card.tributesRequired &&
			!(card.tributesRequired === 1 && player2.fieldSlots.fs3.tributesRequired === 1)
		) {
			tributes.push(player2.fieldSlots.fs3);
		}
		console.log(tributes);
		return tributes;
	};

	const checkForSpellCard = () => {
		const cards = player2.hand.filter((card) => card.type === "spell");
		const randNum = Math.floor(Math.random() * cards.length);
		const card = cards[randNum];
		console.log("AI selected spell:", card);
		if (card) {
			return card;
		}
	};

	const playSpellCard = (spellCard) => {
		if (spellCard.targetRequired) {
			// dispatch(playerActions.setPlayerSpellCard({ card: spellCard, player: spellCard.owner }));
			let targetCard;
			const potentialTargets = [player2.fieldSlots.fs1, player2.fieldSlots.fs2, player2.fieldSlots.fs3].filter((card) => card.id);
			console.log(potentialTargets);
			if (spellCard.effect.stat === "atk") {
				const atkStats = potentialTargets.map((card) => card.atk);
				const highestAtk = Math.max(...atkStats);
				targetCard = potentialTargets.find((card) => card.atk === highestAtk);
				console.log("spell target card:", spellCard, targetCard);
				activateSpell(spellCard, targetCard);
			} else if (spellCard.effect.stat === "def") {
				const defStats = potentialTargets.map((card) => card.def);
				const highestDef = Math.max(...defStats);
				targetCard = potentialTargets.find((card) => card.def === highestDef);
				console.log("spell target card:", spellCard, targetCard);
				activateSpell(spellCard, targetCard);
			}
		} else if (spellCard.effect.type === "field spell") {
			dispatch(playerActions.placeCard({ card: spellCard, player: spellCard.owner }));
		} else {
			const { result } = activateSpell(spellCard);
			console.log("RESULT:", result);
			if (result.destroyedCards) {
				console.log("DESTROYED CARDS AI HOOK", result.destroyedCards);
				currentp1Field = [player1.fieldSlots.fs1, player1.fieldSlots.fs2, player1.fieldSlots.fs3].filter((fs) => !result.destroyedCards.includes(fs.slot));
				if (result.destroyedCards === "all") {
					currentp1Field = [];
				}
				console.log(currentp1Field);
				if (result.sacrificedCards) {
					currentp2Field = [player2.fieldSlots.fs1, player2.fieldSlots.fs2, player2.fieldSlots.fs3].filter((fs) => !result.sacrificedCards.includes(fs.slot));
					console.log(currentp2Field);
					currentP2Hand = state.player2.hand.filter((card) => !result.sacrificedCards.includes(card.id));
					console.log(currentP2Hand);
				}
			}
		}
	};

	const checkForTrapCards = () => {
		const cards = player2.hand.filter((card) => card.type === "trap");
		if (cards) {
			return cards;
		}
	};

	const setTrapCards = (trapCards) => {
		for (let i = 0; i < trapCards.length; i++) {
			dispatch(playerActions.placeCard({ card: trapCards[i], player: trapCards[i].owner }));
		}
	};

	const activateTrapCard = () => {
		const cards = [player2.trapSlots.ts1, player2.trapSlots.ts2, player2.trapSlots.ts3].filter((card) => card.id);
		console.log("trapcards:", cards);
		const randNum = Math.floor(Math.random() * cards.length);
		const selectedCard = cards[randNum];
		const { currentLifePoints, negate } = activateSpell(selectedCard);
		return {
			currentLifePoints,
			negate,
			usedCard: selectedCard,
		};
	};

	const aiDrawCard = () => {
		dispatch(playerActions.drawCard());
		return { hand: player2.hand, stateHand: state.player2.hand };
	};

	const resetCurrentHandsAndFields = useCallback(() => {
		currentP1Hand = [];
		currentP2Hand = [];
		currentp1Field = [];
		currentp2Field = [];
	}, []);

	useEffect(() => {
		if (AiBattlePhase && turnIsInProgress) {
			const chooseBattles = () => {
				console.log("choose card to tattavk check");
				let attackingCards = [];
				if (currentp2Field.length) {
					console.log("current p2 field battle check");
					attackingCards = currentp2Field.filter((card) => card.id && card.position === "atk");
				} else {
					attackingCards = [player2.fieldSlots.fs1, player2.fieldSlots.fs2, player2.fieldSlots.fs3].filter((card) => card.id && card.position === "atk");
				}
				console.log(attackingCards);
				const battles = [];
				let previousTarget;
				const previousTargets = [];
				let targets = [];
				if (currentp1Field.length) {
					targets = currentp1Field.filter((card) => card.id);
				} else {
					targets = [player1.fieldSlots.fs1, player1.fieldSlots.fs2, player1.fieldSlots.fs3].filter((card) => card.id);
				}
				console.log(targets);
				console.log(targets.length, attackingCards.length, hasAttackedLp);
				if (!targets.length && attackingCards.length) {
					attackingCards.forEach((card) => battles.push({ attacker: card, defender: { owner: "lifePoints" } }));
					// setHasAttackedLp(true);
				} else if (attackingCards.length) {
					attackingCards.forEach((card) => {
						console.log("for each start", previousTarget, previousTargets);
						const targetsStats = targets.map((card) => {
							if (card.position === "atk") {
								return { atk: card.atk };
							} else {
								return { def: card.def };
							}
						});
						console.log(targetsStats);
						let battleChosen = false;
						let targetCard;
						targetsStats.forEach((stat) => {
							if (card.atk > stat.atk && !battleChosen) {
								console.log(targets, previousTargets, stat);
								if (previousTargets.length === 1) {
									targetCard = targets.find((target) => target.atk < card.atk && target.id !== previousTargets[0].id);
								} else if (previousTargets.length === 2) {
									targetCard = targets.find((target) => target.atk < card.atk && target.id !== previousTargets[0].id && target.id !== previousTargets[1].id);
								} else {
									targetCard = targets.find((target) => target.atk === stat.atk);
								}
								if (!targetCard) {
									return;
								}
								battles.push({ attacker: card, defender: targetCard });
								battleChosen = true;
								// previousTarget = targetCard;
								previousTargets.push(targetCard);
							} else if (card.atk > stat.def && !battleChosen) {
								if (previousTargets.length) {
									targetCard = targets.find((target) => target.def === stat.def && target.id !== previousTargets[0].id && target.id !== previousTargets[1].id);
								} else {
									targetCard = targets.find((target) => target.def === stat.def);
								}
								console.log(targetCard);
								battles.push({ attacker: card, defender: targetCard });
								battleChosen = true;
								// previousTarget = targetCard;
								previousTargets.push(targetCard);
							}
						});
					});
				}
				console.log(battles);

				return battles;
			};

			// setTimeout(() => {
			const battles = chooseBattles();
			console.log(battles);
			if (battles.length) {
				setBattles(battles);
				setNumberOfBattles(battles.length);
				console.log(battles.length);
				setIsBattling(true);
				setAiBattlePhase(true);
			} else {
				setTurnIsInProgress(false);
				setAiBattlePhase(false);
				resetCurrentHandsAndFields();
				console.log("SET BATTLES ELSE BLOCK AI END TURN");
				console.log("SET BATTLES ELSE BLOCK AI END TURN");
				console.log("SET BATTLES ELSE BLOCK AI END TURN");
				dispatch(playerActions.aiEndTurn());
			}
		}
	}, [AiBattlePhase, dispatch, player1.fieldSlots, player2.fieldSlots, prevSelectedTarget, turnIsInProgress, hasAttackedLp, resetCurrentHandsAndFields, currentp1Field, currentp2Field]);

	useEffect(() => {
		console.log("is battling use effect check start");
		if (isBattling && turnIsInProgress) {
			console.log("is battling is true to get here check");
			console.log(attackInProgress);
			console.log(trapIsActive);

			if (trapIsActive) {
				setTrapIsActive(false);
				return;
			}

			if (battles.length === 0 && !attackInProgress) {
				console.log("BATTLE NUMBER USE EFFECT END TURN CHECK!");
				setNumberOfBattles(false);
				setBattles(null);
				setIsBattling(false);
				setTurnIsInProgress(false);
				setAttackInProgress(false);
				resetCurrentHandsAndFields();
				setHasAttackedLp(false);
				console.log("BATTLE LENGTH 0 AI END TURN CHECK");
				console.log("BATTLE LENGTH 0 AI END TURN CHECK");
				console.log("BATTLE LENGTH 0 AI END TURN CHECK");
				dispatch(playerActions.aiEndTurn());
			} else if (!attackInProgress && battles.length) {
				console.log("BATTLE NUMBER USE EFFECT CHECK");
				console.log("attacker:", battles[0].attacker, "defender:", battles[0].defender);
				dispatch(playerActions.setAiAttackerDefender({ attacker: battles[0].attacker, defender: battles[0].defender }));

				const newBattles = battles.slice(1);
				console.log(newBattles);
				setBattles(newBattles);
				setNumberOfBattles((prevState) => prevState - 1);
				setAttackInProgress(true);
				setTrapIsActive(false);
			}
		}
	}, [numberOfBattles, battles, isBattling, dispatch, attackInProgress, state.attacker, state.defender, trapIsActive, state.player1.isTurn, state.player1.trapSlots, state.player2.trapSlots, turnIsInProgress, resetCurrentHandsAndFields]);

	console.log("number of battles:", numberOfBattles, "battles:", battles);
	console.log("PLAYER1TURN:", state.player1.isTurn, "PLAYER2TURN:", state.player2.isTurn);
	console.log("CUURENT PHASE OF THE MATCH!!:", state.gamePhases);

	const startTurn = () => {
		setTurnIsInProgress(true);

		const spellCard = checkForSpellCard();
		console.log(spellCard);
		if (spellCard) {
			playSpellCard(spellCard);
		}

		const trapCards = checkForTrapCards();
		console.log(trapCards);
		if (trapCards) {
			setTrapCards(trapCards);
		}

		const monsterCard = chooseMonsterCard();
		console.log("chosen monster:", monsterCard);
		if (monsterCard) {
			const tributes = chooseTributes(monsterCard);
			console.log(tributes, tributes.length, monsterCard.tributesRequired);
			if (monsterCard.tributesRequired && tributes.length >= monsterCard.tributesRequired) {
				console.log("summoning tribute card check");
				for (let i = 0; i < tributes.length; i++) {
					dispatch(playerActions.selectTributes({ card: tributes[i], slotId: tributes[i].slot }));
				}
				dispatch(playerActions.removeTributedCards());
				dispatch(playerActions.placeCard({ card: monsterCard, player: monsterCard.owner }));
				dispatch(playerActions.clearSelectedTributes());
				currentP2Hand = state.player2.hand.filter((card, index) => !tributes.includes(card));
				console.log(currentP2Hand);
			} else {
				dispatch(playerActions.placeCard({ card: monsterCard, player: monsterCard.owner }));
				console.log(monsterCard, monsterCard.owner);
				console.log("normal card summon check");
			}

			setTimeout(() => {
				setAiBattlePhase(true);
			}, 750);
		} else {
			console.log("NORMAL ELSE CHEKC  AI END TURN");
			console.log("NORMAL ELSE CHEKC  AI END TURN");
			console.log("NORMAL ELSE CHEKC  AI END TURN");

			resetCurrentHandsAndFields();
			dispatch(playerActions.aiEndTurn());
		}
	};

	return { startTurn, aiDrawCard, activateTrapCard, turnIsInProgress, attackInProgress, setAttackFalse, setAttackTrue, setTrapIsActiveTrueHandler, setTrapIsActiveFalseHandler };
};
