import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { playerActions } from "../store/index";

export const useSpell = () => {
	const dispatch = useDispatch();
	const gameState = useSelector((state) => state.player);
	const player1 = useSelector((state) => state.player.player1);
	const player2 = useSelector((state) => state.player.player2);
	const attacker = useSelector((state) => state.player.attacker);
	const [message, setMessage] = useState("");
	const [isSelectingTarget, setIsSelectingTarget] = useState(false);

	useEffect(() => {
		const fieldSpellActivator = (spellCard) => {
			const stat = spellCard.effect.stat;
			const amount = spellCard.effect.amount;
			const cards = spellCard.owner === "p1" ? [player1.fieldSlots.fs1, player1.fieldSlots.fs2, player1.fieldSlots.fs3].filter((card) => card.id) : [player2.fieldSlots.fs1, player2.fieldSlots.fs2, player2.fieldSlots.fs3].filter((card) => card.id);

			if (cards.length) {
				cards.forEach((card) => {
					if (!card.buffed) {
						if (stat === "atk") {
							const newStat = card.atk + amount;
							const updatedCard = { ...card, atk: newStat, buffed: true };
							dispatch(playerActions.updateCard({ updatedCard }));
						}
						if (stat === "def") {
							const newStat = card.def + amount;
							const updatedCard = { ...card, def: newStat, buffed: true };
							dispatch(playerActions.updateCard({ updatedCard }));
						}
					}
				});
			}
		};
		if (player1.fieldSpell.id) {
			fieldSpellActivator(player1.fieldSpell);
		}

		if (player2.fieldSpell.id) {
			fieldSpellActivator(player2.fieldSpell);
		}
	}, [player1.fieldSlots, player2.fieldSlots, player1.fieldSpell, player2.fieldSpell, dispatch]);

	const spellCalc = (spellCard, targetCard) => {
		console.log(spellCard);
		const effect = spellCard.effect;
		console.log(spellCard.negate);
		let negate = false;
		if (spellCard.negate) {
			negate = true;
		}

		if (effect.type === "heal") {
			if (spellCard.owner === "p1") {
				if (effect.amount === "atk") {
					const newLifePoints = player1.lifePoints + attacker.atk;
					console.log(newLifePoints, attacker.atk);
					dispatch(playerActions.addToBattleLog({ player: spellCard.owner, gainedLp: attacker.atk }));

					const result = { newLifePoints, player: spellCard.owner, negate };
					return result;
				}
				const newLifePoints = player1.lifePoints + effect.amount;
				dispatch(playerActions.addToBattleLog({ player: spellCard.owner, gainedLp: effect.amount }));
				return { newLifePoints, player: spellCard.owner, negate };
			} else if (spellCard.owner === "p2") {
				if (effect.amount === "atk") {
					const newLifePoints = player2.lifePoints + attacker.atk;
					console.log(newLifePoints, attacker.atk);
					dispatch(playerActions.addToBattleLog({ player: spellCard.owner, gainedLp: attacker.atk }));
					const result = { newLifePoints, player: spellCard.owner, negate };
					return result;
				}
				const newLifePoints = player2.lifePoints + effect.amount;
				dispatch(playerActions.addToBattleLog({ player: spellCard.owner, gainedLp: effect.amount }));

				const result = { newLifePoints, player: spellCard.owner, negate };
				return result;
			}
		}

		if (effect.type === "increase") {
			console.log(spellCard, targetCard);
			// if (!targetCard) {
			// 	console.log("null check");
			// 	setIsSelectingTarget(true);
			// 	return;
			// }
			if (effect.stat === "atk") {
				console.log("stat pass check");
				console.log(targetCard.atk);
				const newAtk = targetCard.atk + effect.amount;
				const updatedCard = { ...targetCard, atk: newAtk, negate };
				console.log(updatedCard);
				const result = { updatedCard };
				return result;
			} else if (effect.stat === "def") {
				const newDef = targetCard.def + effect.amount;
				const updatedCard = { ...targetCard, def: newDef, negate };
				setIsSelectingTarget(false);
				const result = { updatedCard };
				return result;
			}
		}

		if (effect.type === "damage") {
			console.log("damage check");
			const dmg = effect.amount;
			console.log(dmg);
			const damagedPlayer = spellCard.owner === "p1" ? "p2" : "p1";

			if (spellCard.owner === "p1") {
				const newLifePoints = player2.lifePoints - dmg;
				const result = { newLifePoints, player: damagedPlayer, negate };
				dispatch(playerActions.addToBattleLog({ player: damagedPlayer, lostLp: dmg }));

				return result;
				// return { newLifePoints, player: damagedPlayer, negate };
			} else if (spellCard.owner === "p2") {
				const newLifePoints = player1.lifePoints - dmg;
				// return { newLifePoints, player: damagedPlayer, negate };
				const result = { newLifePoints, player: damagedPlayer, negate };
				dispatch(playerActions.addToBattleLog({ player: damagedPlayer, lostLp: dmg }));

				return result;
			}

			console.log("checkkedd");
		}

		if (effect.type === "draw") {
			const drawAmount = effect.amount;
			const result = { drawAmount, negate };
			return result;
		}

		if (effect.type === "drain") {
			const player = spellCard.owner === "p1" ? "p1" : "p2";
			let p1NewLifePoints;
			let p2NewLifePoints;
			if (player === "p1") {
				p1NewLifePoints = player1.lifePoints + effect.amount;
				p2NewLifePoints = player2.lifePoints - effect.amount;
			} else if (player === "p2") {
				p2NewLifePoints = player2.lifePoints + effect.amount;
				p1NewLifePoints = player1.lifePoints - effect.amount;
			}

			const result = { player: "both", newLifePoints: { p1: p1NewLifePoints, p2: p2NewLifePoints } };
			return result;
		}

		if (effect.type === "destroy") {
			if (gameState.aiPlaying && effect.amount === "all") {
				if (gameState.player2.hand.length < 4) {
					console.log("AI KILLSWITCH FOR BLACK HOLE SPELL");
					const result = {};
					return result;
				}
			}

			if (effect.amount === "attacker") {
				console.log("destroy attacker check");
				const id = attacker.id;
				const cards = spellCard.owner === "p1" ? player2.fieldSlots : player1.fieldSlots;
				const getSlot = () => {
					for (const fs in cards) {
						console.log(cards[fs]);
						if (cards[fs].id === id) {
							return cards[fs].slot;
						}
					}
				};
				const destroyedCards = getSlot();
				console.log(destroyedCards, negate);
				const result = { destroyedCards, negate };
				return result;
			}
			const destroyAmount = effect.amount;
			const sacrificeAmount = effect.conditionAmount;
			const sacrificeLocation = effect.conditionLocation;

			const fieldSlots = spellCard.owner === "p1" ? player2.fieldSlots : player1.fieldSlots;
			const targets = Object.keys(fieldSlots)
				.map((fieldSlot) => {
					return fieldSlots[fieldSlot];
				})
				.filter((card) => card.owner);

			if (!targets.length && effect.condition) {
				console.log("NO CARDS TO TARGET");
				const result = { message: "No Cards To Target" };
				return result;
			}

			const destroyedCards = [];
			if (destroyAmount !== "all") {
				for (let i = 0; i < destroyAmount; i++) {
					const ranNum = Math.floor(Math.random() * targets.length);
					console.log(ranNum);
					console.log(targets);
					const slotId = targets[ranNum].slot;
					console.log(slotId);
					destroyedCards.push(slotId);
				}
			} else {
				destroyedCards.push("all");
			}
			let potentialSacrifices;
			if (sacrificeLocation === "hand") {
				const playerHand = spellCard.owner === "p1" ? player1.hand : player2.hand;
				potentialSacrifices = playerHand.filter((card) => {
					console.log(card.id, spellCard.id, card.id !== spellCard.id);
					return card.id !== spellCard.id;
				});
			} else {
				const playerFieldSlots = spellCard.owner === "p1" ? player1.fieldSlots : player2.fieldSlots;
				potentialSacrifices = Object.keys(playerFieldSlots)
					.map((fieldSlot) => {
						return playerFieldSlots[fieldSlot];
					})
					.filter((card) => card.owner);
			}

			if (!potentialSacrifices.length && effect.condition) {
				console.log("NO CARDS TO SCARIFICE");
				const result = { message: "No Cards To Sacrifice" };
				return result;
			}

			const sacrificedCards = [];
			for (let i = 0; i < sacrificeAmount; i++) {
				const ranNum = Math.floor(Math.random() * potentialSacrifices.length);
				let slotId;
				if (sacrificeLocation === "field") {
					slotId = potentialSacrifices[ranNum].slot;
				} else if (sacrificeLocation === "hand") {
					const card = potentialSacrifices.splice(ranNum, 1);
					console.log(card, card[0]);
					console.log(potentialSacrifices, ranNum);
					if (!card[0]) {
						return;
					}
					slotId = card[0].id;
				}
				sacrificedCards.push(slotId);
			}
			console.log(sacrificedCards);
			const sacrificingPlayer = spellCard.owner === "p1" ? "p1" : "p2";
			let newHand = [];

			for (let i = 0; i < potentialSacrifices.length; i++) {
				console.log(potentialSacrifices[i]);
				if (potentialSacrifices[i].id !== sacrificedCards[0]) {
					newHand.push(potentialSacrifices[i]);
				}
			}

			console.log(newHand, sacrificingPlayer);

			const result = { destroyedCards, sacrificedCards, sacrificeLocation, player: spellCard.owner, negate };
			return result;
		}
	};

	const activateSpell = (spellCard, targetCard = null) => {
		dispatch(playerActions.addToBattleLog({ card: spellCard }));
		const result = spellCalc(spellCard, targetCard);
		console.log(result);

		// console.log(newLifePoints, player);
		// console.log(updatedCard);
		// console.log("NEGATE:", negate);
		if (result) {
			if (result.message) {
				console.log("message check");
				console.log(result.message);
				setMessage(result.message);
				dispatch(playerActions.addToBattleLog({ message: message }));
			}
			if (result.destroyedCards) {
				console.log("DESTROYED CARDS:", result.destroyedCards);
				let slotIds;
				if (result.destroyedCards === "all") {
					slotIds = "all";
				} else {
					slotIds = result.destroyedCards;
				}
				console.log("SLOTIDS", slotIds);
				dispatch(playerActions.clearFieldSlot({ slotIds: result.destroyedCards }));
			}

			if (result.sacrificedCards) {
				const slotIds = result.sacrificedCards;
				console.log(slotIds, result.sacrificedCards);
				const sacrificeLocation = result.sacrificeLocation;
				const player = result.player;
				dispatch(playerActions.clearFieldSlot({ slotIds, sacrificeLocation, player }));
			}

			if (result.newLifePoints) {
				console.log(result.player, result.newLifePoints);
				const player = result.player;

				const newLifePoints = result.newLifePoints;
				dispatch(playerActions.updatePlayerLife({ player, newLifePoints }));
			}

			if (result.updatedCard) {
				const updatedCard = result.updatedCard;
				dispatch(playerActions.updateCard({ updatedCard }));
			}

			if (result.drawAmount) {
				const drawAmount = result.drawAmount;
				dispatch(playerActions.drawCard({ drawAmount, owner: spellCard.owner }));
			}
			if (!result.message) {
				dispatch(playerActions.removeUsedSpellCard({ owner: spellCard.owner, id: spellCard.id }));
			}
			let currentLifePoints;
			console.log(result.player);
			if (result.player === "p1") {
				currentLifePoints = { p1: result.newLifePoints, p2: player2.lifePoints };
			} else if (result.player === "p2") {
				currentLifePoints = { p1: player1.lifePoints, p2: result.newLifePoints };
			} else if (result.player === "both") {
				currentLifePoints = { p1: result.newLifePoints.p1, p2: result.newLifePoints.p2 };
			}
			console.log(player1.lifePoints, player2.lifePoints, result.newLifePoints);
			console.log(currentLifePoints);
			const negate = result.negate;
			return {
				currentLifePoints,
				negate,
				result,
			};
		}
	};

	const clearMessage = () => {
		setMessage("");
	};

	return {
		spellCalc,
		activateSpell,
		isSelectingTarget,
		message,
		clearMessage,
	};
};
