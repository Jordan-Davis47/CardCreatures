import { createSlice, configureStore } from "@reduxjs/toolkit";

//HELPER FUNCTIONS//

const playerInitialState = {
	//GAME TURNS//
	//PLAYER TURNS//
	player1: {
		fieldSlots: {
			fs1: {},
			fs2: {},
			fs3: {},
		},
		trapSlots: {
			ts1: {},
			ts2: {},
			ts3: {},
		},
		fieldSpell: {},
		hand: [],
		deck: [],
		lifePoints: 2000,
		graveyard: [],
		hasSummoned: false,
		isTurn: false,
		castingSpellCard: {},
		isCastingSpell: false,
		stats: {
			damageDealt: 0,
			damageHealed: 0,
			damageTaken: 0,
			cardsUsed: 0,
		},
	},
	player2: {
		fieldSlots: {
			fs1: {},
			fs2: {},
			fs3: {},
		},
		trapSlots: {
			ts1: {},
			ts2: {},
			ts3: {},
		},
		hand: [],
		deck: [],
		fieldSpell: {},
		lifePoints: 2000,
		graveyard: [],
		hasSummoned: false,
		isTurn: false,
		castingSpellCard: {},
		isCastingSpell: false,
		stats: {
			damageDealt: 0,
			damageHealed: 0,
			damageTaken: 0,
			cardsUsed: 0,
		},
	},

	//GAME PHASES//
	gamePhases: {
		turn: 0,
		drawPhase: false,
		summonPhase: false,
		battlePhase: false,
	},

	attacker: {},
	defender: {},
	//TRIBUTING STATES//
	tributes: [],
	isTributing: false,
	tributePrompt: false, //BOOLEAN FLAG FOR TRIBUTE SUMMON BUTTON//
	canTributeSummon: false,
	selectedCard: [], //SELECTED CARD FOR TRIBUTE SUMMON//
	//SPELL CARD STATES//
	spellCastCard: [],
	spellTarget: [],
	// isCastingSpell: false,
	aiPlaying: true,
	battleLog: [],
};

const playerSlice = createSlice({
	name: "player",
	initialState: playerInitialState,
	reducers: {
		playersDrawHand(state, action) {
			for (let i = 0; i < 4; i++) {
				let p1Card = state.player1.deck.shift();
				state.player1.hand.push(p1Card);
				let p2Card = state.player2.deck.shift();
				state.player2.hand.push(p2Card);
			}
			state.gamePhases.turn = state.gamePhases.turn + 1;
			state.player1.isTurn = true;
		},

		setPlayerDeck(state, action) {
			//shuffle deck//
			let shuffledDeck = [...action.payload.deck];
			// console.log("deck:", shuffledDeck);
			for (let i = 0; i < action.payload.deck.length; i++) {
				let randomNum = Math.floor(Math.random() * action.payload.deck.length);
				let card = shuffledDeck[i];
				shuffledDeck[i] = shuffledDeck[randomNum];
				shuffledDeck[randomNum] = card;
			}
			//set deck based on player//
			if (action.payload.player === "player1") {
				const deck = shuffledDeck.map((card) => (card = { ...card, owner: "p1" }));
				// console.log("deck with owner:", deck);
				state.player1.deck = deck;
			} else if (action.payload.player === "player2") {
				const deck = shuffledDeck.map((card) => (card = { ...card, owner: "p2" }));
				// console.log("deck with owner:", deck);
				state.player2.deck = deck;
			}
		},
		//DRAW ONE CARD TO HAND AT START OF TURN//
		drawCard(state, action) {
			if (action.payload) {
				console.log("draw", action.payload.drawAmount);
				// if (state.aiPlaying && action.payload.owner === 'p2') {
				// 	const deck = state.player2.deck;
				// 	for (let i = 0; i < action.payload.drawAmount; i++) {
				// 		const card = deck.shift();
				// 		state.player2.hand.push(card);
				// 	}
				// }
				if (state.player1.isTurn) {
					console.log(state.player1.deck);
					for (let i = 0; i < action.payload.drawAmount; i++) {
						const card = state.player1.deck.shift();
						state.player1.hand.push(card);
					}
				} else if (state.player2.isTurn || (state.aiPlaying && action.payload.owner === "p2")) {
					const deck = state.player2.deck;
					for (let i = 0; i < action.payload.drawAmount; i++) {
						const card = deck.shift();
						state.player2.hand.push(card);
					}
				}
				return;
			}
			if (state.player1.isTurn && state.gamePhases.drawPhase) {
				if (!state.player1.deck.length) {
					state.gamePhases.drawPhase = false;
					state.gamePhases.summonPhase = true;
					return;
				}
				const card = state.player1.deck.shift();
				state.player1.hand.push(card);
				state.gamePhases.drawPhase = false;
				state.gamePhases.summonPhase = true;
			}
			if (state.player2.isTurn && state.gamePhases.drawPhase) {
				console.log("player 2 draw check");

				if (!state.player2.deck.length) {
					state.gamePhases.drawPhase = false;
					state.gamePhases.summonPhase = true;
					return;
				}
				// console.log("p2handb4:", state.player2.hand);
				const card = state.player2.deck.shift();
				state.player2.hand.push(card);
				// console.log("p2handafter:", state.player2.hand);

				state.gamePhases.drawPhase = false;
				state.gamePhases.summonPhase = true;
			}
		},

		//SETS CURRENTLY USED SPELL CARD FOR REFERENCE//
		setSpellCastCard(state, action) {
			state.spellCastCard = action.payload.card;
		},
		//LOGIC FOR SUMMONING CARD ONTO FIELD///
		placeCard(state, action) {
			if (!action.payload.card) {
				return;
			}
			console.log("placeCardCheck!", action.payload);
			if (action.payload.player === "p1") {
				if (action.payload.card.type === "trap") {
					console.log("trap card check!!");
					if (!state.player1.trapSlots.ts1.owner) {
						const card = { ...action.payload.card, slot: "p1t1", isPlaying: true, setTrap: true };
						state.player1.trapSlots.ts1 = card;
						state.player1.stats.cardsUsed++;
					} else if (!state.player1.trapSlots.ts2.owner) {
						const card = { ...action.payload.card, slot: "p1t2", isPlaying: true, setTrap: true };
						state.player1.trapSlots.ts2 = card;
						state.player1.stats.cardsUsed++;
					} else if (!state.player1.trapSlots.ts3.owner) {
						const card = { ...action.payload.card, slot: "p1t3", isPlaying: true, setTrap: true };
						state.player1.trapSlots.ts3 = card;
						state.player1.stats.cardsUsed++;
					} else {
						console.log("CANNOT PLACE ANY MORE TRAP CARDS");
						return;
					}
					state.player1.hand = state.player1.hand.filter((card) => card.id !== action.payload.card.id);
					return;
				}

				if (action.payload.card.type === "spell") {
					const card = { ...action.payload.card, slot: "p1fs1", isPlaying: true };
					console.log(card);
					state.player1.fieldSpell = card;
					state.player1.stats.cardsUsed++;
					state.player1.hand = state.player1.hand.filter((card) => card.id !== action.payload.card.id);
					return;
				}
				console.log(state.player1.fieldSlots.fs1.owner, state.player1.hasSummoned, state.gamePhases.summonPhase);
				if (!state.player1.fieldSlots.fs1.owner && !state.player1.hasSummoned && state.gamePhases.summonPhase) {
					console.log("p1s1 trib check");
					const card = { ...action.payload.card, slot: "p1s1", isPlaying: true };
					state.player1.fieldSlots.fs1 = card;
					state.player1.stats.cardsUsed++;
					if (card.position === "def") {
						state.battleLog.push(`Player 1 summoned a monster in defence position`);
					} else {
						state.battleLog.push(`Player 1 summoned ${card.name} to the field`);
					} // state.player1.hasSummoned = true;
					// state.hasSummoned = true;
				} else if (!state.player1.fieldSlots.fs2.owner && !state.player1.hasSummoned && state.gamePhases.summonPhase) {
					const card = { ...action.payload.card, slot: "p1s2", isPlaying: true };
					state.player1.fieldSlots.fs2 = card;
					state.player1.stats.cardsUsed++;
					if (card.position === "def") {
						state.battleLog.push(`Player 1 summoned a monster in defence position`);
					} else {
						state.battleLog.push(`Player 1 summoned ${card.name} to the field`);
					}
					// state.player1.hasSummoned = true;
				} else if (!state.player1.fieldSlots.fs3.owner && !state.player1.hasSummoned && state.gamePhases.summonPhase) {
					const card = { ...action.payload.card, slot: "p1s3", isPlaying: true };
					state.player1.fieldSlots.fs3 = card;
					state.player1.stats.cardsUsed++;
					if (card.position === "def") {
						state.battleLog.push(`Player 1 summoned a monster in defence position`);
					} else {
						state.battleLog.push(`Player 1 summoned ${card.name} to the field`);
					}
					// state.player1.hasSummoned = true;
				} else {
					console.log("cant place anymore cards this turn");
					return;
				}
				state.player1.hand = state.player1.hand.filter((card) => card.id !== action.payload.card.id);
				state.selectedCard = {};
			} else if (action.payload.player === "p2") {
				if (action.payload.card.type === "trap") {
					console.log("trap card check!!");
					if (!state.player2.trapSlots.ts1.owner) {
						const card = { ...action.payload.card, slot: "p2t1", isPlaying: true, setTrap: true };
						state.player2.trapSlots.ts1 = card;
						state.player2.stats.cardsUsed++;
					} else if (!state.player2.trapSlots.ts2.owner) {
						const card = { ...action.payload.card, slot: "p2t2", isPlaying: true, setTrap: true };
						state.player2.trapSlots.ts2 = card;
						state.player2.stats.cardsUsed++;
					} else if (!state.player2.trapSlots.ts3.owner) {
						const card = { ...action.payload.card, slot: "p2t3", isPlaying: true, setTrap: true };
						state.player2.trapSlots.ts3 = card;
						state.player2.stats.cardsUsed++;
					} else {
						console.log("CANNOT PLACE ANY MORE TRAP CARDS");
						return;
					}
					state.player2.hand = state.player2.hand.filter((card) => card.id !== action.payload.card.id);
					return;
				}

				if (action.payload.card.type === "spell") {
					const card = { ...action.payload.card, slot: "p2fs1", isPlaying: true };
					state.player2.fieldSpell = card;
					state.player2.stats.cardsUsed++;
					state.player2.hand = state.player2.hand.filter((card) => card.id !== action.payload.card.id);
					return;
				}

				console.log(state.player2.fieldSlots.fs1.owner, state.player2.hasSummoned, state.gamePhases.summonPhase);

				if (!state.player2.fieldSlots.fs1.owner && !state.player2.hasSummoned && (state.gamePhases.summonPhase || state.aiPlaying)) {
					const card = { ...action.payload.card, slot: "p2s1", isPlaying: true };
					state.player2.fieldSlots.fs1 = card;
					state.player2.hasSummoned = true;
					state.player2.stats.cardsUsed++;
					if (card.position === "def") {
						state.battleLog.push(`Player 2 summoned a monster in defence position`);
					} else {
						state.battleLog.push(`Player 2 summoned ${card.name} to the field`);
					}

					state.player2.hand = state.player2.hand.filter((card) => card.id !== action.payload.card.id);
				} else if (!state.player2.fieldSlots.fs2.owner && !state.player2.hasSummoned && (state.gamePhases.summonPhase || state.aiPlaying)) {
					const card = { ...action.payload.card, slot: "p2s2", isPlaying: true };
					state.player2.fieldSlots.fs2 = card;
					state.player2.hasSummoned = true;
					state.player2.stats.cardsUsed++;
					if (card.position === "def") {
						state.battleLog.push(`Player 2 summoned a monster in defence position`);
					} else {
						state.battleLog.push(`Player 2 summoned ${card.name} to the field`);
					}
					state.player2.hand = state.player2.hand.filter((card) => card.id !== action.payload.card.id);
				} else if (!state.player2.fieldSlots.fs3.owner && !state.player2.hasSummoned && (state.gamePhases.summonPhase || state.aiPlaying)) {
					const card = { ...action.payload.card, slot: "p2s3", isPlaying: true };
					state.player2.fieldSlots.fs3 = card;
					state.player2.hasSummoned = true;
					state.player2.stats.cardsUsed++;
					if (card.position === "def") {
						state.battleLog.push(`Player 2 summoned a monster in defence position`);
					} else {
						state.battleLog.push(`Player 2 summoned ${card.name} to the field`);
					}
					state.player2.hand = state.player2.hand.filter((card) => card.id !== action.payload.card.id);
				} else {
					console.log("CANNOT PLACE ANYMORE CARDS THIS TURN...");
					return;
				}
				state.selectedCard = {};
			}
		},
		//SETS ATTACKING AND DEFENDING CARDS WHEN CHOSEN ON BOARD//
		battleSelect(state, action) {
			const payload = action.payload;

			if (state.attacker.owner && !state.defender.owner) {
				// ATTACK SETTER LOGIC - SETS DEFENDER SO LIFE POINTS CAN BE DIRECTLY ATTACKED//
				if (payload.card.owner === "lifePoints") {
					state.defender = { ...payload.card };
					console.log("direct attck selcted!");
				}
				//NON DIRECT ATTACK DEFENDER SELECTOR LOGIC//
				console.log("set defender check");
				if (payload.card.owner === "p1" && !state.player1.isTurn) {
					state.defender = { ...payload.card };
				} else if (payload.card.owner === "p2" && !state.player2.isTurn) {
					state.defender = { ...payload.card };
				}
			}

			if (!payload.card.hasAttacked && payload.card.position !== "def") {
				console.log("FIRST BATTLE SELECT CHECK PASSED");
				if ((payload.card.slot === "p1s1" || payload.card.slot === "p1s2" || payload.card.slot === "p1s3") && state.player1.isTurn) {
					console.log("attacker set");
					state.attacker = { ...payload.card };
				}
				if ((payload.card.slot === "p2s1" || payload.card.slot === "p2s2" || payload.card.slot === "p2s3") && state.player2.isTurn) {
					console.log("p2 attacker set check");
					state.attacker = { ...payload.card };
				}
			}
		},

		setAiAttackerDefender(state, action) {
			console.log("setA&D:", action.payload);
			state.attacker = action.payload.attacker;
			state.defender = action.payload.defender;
			state.battleLog.push(`${state.attacker.name} attacked ${state.defender.name}`);
		},

		setPlayerSpellCard(state, action) {
			if (action.payload.player === "p1") {
				state.player1.castingSpellCard = action.payload.card;
				state.player1.isCastingSpell = true;
			} else if (action.payload.player === "p2") {
				state.player2.castingSpellCard = action.payload.card;
				state.player2.isCastingSpell = true;
			}
		},

		clearPlayerSpellCard(state, action) {
			if (action.payload.player === "p1") {
				state.player1.castingSpellCard = {};
				state.player2.stats.cardsUsed++;
				state.player1.isCastingSpell = false;
			} else if (action.payload.player === "p2") {
				state.player2.castingSpellCard = {};
				state.player2.stats.cardsUsed++;
				state.player2.isCastingSpell = false;
			}
		},

		setHasAttacked(state, action) {
			if (action.payload.slotId === "p1s1") {
				state.player1.fieldSlots.fs1 = { ...state.player1.fieldSlots.fs1, hasAttacked: true };
			} else if (action.payload.slotId === "p1s2") {
				state.player1.fieldSlots.fs2 = { ...state.player1.fieldSlots.fs2, hasAttacked: true };
			} else if (action.payload.slotId === "p1s3") {
				state.player1.fieldSlots.fs3 = { ...state.player1.fieldSlots.fs3, hasAttacked: true };
			} else if (action.payload.slotId === "p2s1") {
				state.player2.fieldSlots.fs1 = { ...state.player2.fieldSlots.fs1, hasAttacked: true };
			} else if (action.payload.slotId === "p2s2") {
				state.player2.fieldSlots.fs2 = { ...state.player2.fieldSlots.fs2, hasAttacked: true };
			} else if (action.payload.slotId === "p2s3") {
				state.player2.fieldSlots.fs3 = { ...state.player2.fieldSlots.fs3, hasAttacked: true };
			}
			// state.attacker = { ...state.attacker, hasAttacked: true };
		},

		updatePlayerLife(state, action) {
			console.log("update player life reached");
			console.log(action.payload);

			const calculateLpDiff = (lp, player) => {
				const playerCurrentLp = player === "p1" ? state.player1.lifePoints : state.player2.lifePoints;
				console.log(playerCurrentLp, lp);
				if (lp < playerCurrentLp) {
					const dmg = playerCurrentLp - lp;
					console.log(dmg);
					player === "p1" ? (state.player1.stats.damageTaken = state.player1.stats.damageTaken + dmg) : (state.player2.stats.damageTaken = state.player2.stats.damageTaken + dmg);
					player === "p1" ? (state.player2.stats.damageDealt = state.player2.stats.damageDealt + dmg) : (state.player1.stats.damageDealt = state.player1.stats.damageDealt + dmg);
				} else if (lp > playerCurrentLp) {
					const heal = lp - playerCurrentLp;
					player === "p1" ? (state.player1.stats.damageHealed = state.player1.stats.damageHealed + heal) : (state.player2.stats.damageHealed = state.player2.stats.damageHealed + heal);
				}
			};

			if (action.payload.player === "both") {
				calculateLpDiff(action.payload.newLifePoints.p1, "p1");
				state.player1.lifePoints = action.payload.newLifePoints.p1;
				calculateLpDiff(action.payload.newLifePoints.p2, "p2");
				state.player2.lifePoints = action.payload.newLifePoints.p2;
			} else if (action.payload.player === "p1") {
				calculateLpDiff(action.payload.newLifePoints, "p1");
				state.player1.lifePoints = action.payload.newLifePoints;
			} else if (action.payload.player === "p2") {
				calculateLpDiff(action.payload.newLifePoints, "p2");
				state.player2.lifePoints = action.payload.newLifePoints;
			}
		},

		updateCard(state, action) {
			const slot = action.payload.updatedCard.slot;
			if (slot === "p1s1") {
				state.player1.fieldSlots.fs1 = { ...action.payload.updatedCard };
			} else if (slot === "p1s2") {
				state.player1.fieldSlots.fs2 = { ...action.payload.updatedCard };
			} else if (slot === "p1s3") {
				state.player1.fieldSlots.fs3 = { ...action.payload.updatedCard };
			} else if (slot === "p2s1") {
				state.player2.fieldSlots.fs1 = { ...action.payload.updatedCard };
			} else if (slot === "p2s2") {
				state.player2.fieldSlots.fs2 = { ...action.payload.updatedCard };
			} else if (slot === "p2s3") {
				state.player2.fieldSlots.fs3 = { ...action.payload.updatedCard };
			}
			state.player1.isCastingSpell = false;
			state.player1.spellCastCard = {};
			state.player2.isCastingSpell = false;
			state.player2.spellCastCard = {};
		},

		updatePlayerHand(state, action) {
			if (action.payload.player === "p1") {
				state.player1.hand = action.payload.hand;
			} else if (action.payload.player === "p2") {
				state.player2.hand = action.payload.hand;
			}
		},

		removeUsedSpellCard(state, action) {
			console.log("remove spell:", action.payload);
			if (action.payload.owner === "p1") {
				const card = state.player1.hand.find((card) => card.id === action.payload.id);
				console.log(card);
				state.player1.graveyard.push(card);
				state.player1.hand = state.player1.hand.filter((card) => card.id !== action.payload.id);
				state.player1.stats.cardsUsed++;
			} else {
				const card = state.player2.hand.find((card) => card.id === action.payload.id);
				console.log(card);
				state.player2.graveyard.push(card);
				state.player2.hand = state.player2.hand.filter((card) => card.id !== action.payload.id);
				state.player2.stats.cardsUsed++;
			}
		},

		clearFieldSlot(state, action) {
			console.log(action.payload);
			if (action.payload.sacrificeLocation === "hand") {
				if (action.payload.player === "p1") {
					for (let i = 0; i < action.payload.slotIds.length; i++) {
						const card = state.player1.hand.find((card) => card.id === action.payload.slotIds[i]);
						console.log(card);
						state.player1.graveyard.push(card);
						state.player1.hand = state.player1.hand.filter((card) => card.id !== action.payload.slotIds[i]);
						state.battleLog.push(`Player 1 sent ${card.name} to the graveyard`);
					}
				} else if (action.payload.player === "p2") {
					for (let i = 0; i < action.payload.slotIds.length; i++) {
						const card = state.player2.hand.find((card) => card.id === action.payload.slotIds[i]);
						console.log(card);
						state.player2.graveyard.push(card);
						state.player2.hand = state.player2.hand.filter((card) => card.id !== action.payload.slotIds[i]);
						state.battleLog.push(`Player 2 sent ${card.name} to the graveyard`);
					}
				}
			}

			if (action.payload.slotIds[0] === "all") {
				state.player1.fieldSlots = {
					fs1: {},
					fs2: {},
					fs3: {},
				};
				state.player2.fieldSlots = {
					fs1: {},
					fs2: {},
					fs3: {},
				};
			} else {
				for (let i = 0; i < action.payload.slotIds.length; i++) {
					console.log(action.payload);
					console.log(action.payload.slotIds[0]);
					if (typeof action.payload.slotIds === "string") {
						console.log("STRING CHECK");
						action.payload.slotIds = [action.payload.slotIds];
					}
					console.log(action.payload.slotIds, action.payload.slotIds[0]);

					if (action.payload.slotIds[i] === "p1s1") {
						console.log("p1s1 clear reached");
						state.player1.graveyard = [...state.player1.graveyard, state.player1.fieldSlots.fs1];
						state.battleLog.push(`${state.player1.fieldSlots.fs1.name} was sent to the graveyard 1`);
						state.player1.fieldSlots.fs1 = {};
					} else if (action.payload.slotIds[i] === "p1s2") {
						state.player1.graveyard = [...state.player1.graveyard, state.player1.fieldSlots.fs2];
						state.battleLog.push(`${state.player1.fieldSlots.fs2.name} was sent to the graveyard`);
						state.player1.fieldSlots.fs2 = {};
					} else if (action.payload.slotIds[i] === "p1s3") {
						state.player1.graveyard = [...state.player1.graveyard, state.player1.fieldSlots.fs3];
						state.battleLog.push(`${state.player1.fieldSlots.fs3.name} was sent to the graveyard`);
						state.player1.fieldSlots.fs3 = {};
					} else if (action.payload.slotIds[i] === "p2s1") {
						state.player2.graveyard = [...state.player2.graveyard, state.player2.fieldSlots.fs1];
						state.battleLog.push(`${state.player2.fieldSlots.fs1.name} was sent to the graveyard`);
						state.player2.fieldSlots.fs1 = {};
					} else if (action.payload.slotIds[i] === "p2s2") {
						state.player2.graveyard = [...state.player2.graveyard, state.player2.fieldSlots.fs2];
						state.battleLog.push(`${state.player2.fieldSlots.fs2.name} was sent to the graveyard`);
						state.player2.fieldSlots.fs2 = {};
					} else if (action.payload.slotIds[i] === "p2s3") {
						state.player2.graveyard = [...state.player2.graveyard, state.player2.fieldSlots.fs3];
						state.battleLog.push(`${state.player2.fieldSlots.fs3.name} was sent to the graveyard`);
						state.player2.fieldSlots.fs3 = {};
					} else if (action.payload.slotIds[i] === "p1t1") {
						state.player1.graveyard = [...state.player1.graveyard, state.player1.trapSlots.ts1];
						state.player1.trapSlots.ts1 = {};
					} else if (action.payload.slotIds[i] === "p1t2") {
						state.player1.graveyard = [...state.player1.graveyard, state.player1.trapSlots.ts2];
						state.player1.trapSlots.ts2 = {};
					} else if (action.payload.slotIds[i] === "p1t3") {
						state.player1.graveyard = [...state.player1.graveyard, state.player1.trapSlots.ts3];
						state.player1.trapSlots.ts3 = {};
					} else if (action.payload.slotIds[i] === "p2t1") {
						state.player2.graveyard = [...state.player2.graveyard, state.player2.trapSlots.ts1];
						state.player2.trapSlots.ts1 = {};
					} else if (action.payload.slotIds[i] === "p2t2") {
						state.player2.graveyard = [...state.player2.graveyard, state.player2.trapSlots.ts2];
						state.player2.trapSlots.ts2 = {};
					} else if (action.payload.slotIds[i] === "p2t3") {
						state.player2.graveyard = [...state.player2.graveyard, state.player2.trapSlots.ts3];
						state.player2.trapSlots.ts3 = {};
					}
				}
			}
		},

		//CALCULATES DAMAGE FROM BATTLE (ATTACKER AND DEFENDER) AND SETS PLAYER LIFE//

		clearAttackerDefender(state) {
			console.log("cleaaring atker defender");
			state.attacker = [];
			state.defender = [];
		},

		setPlayerTurn(state, action) {
			console.log("SET TURN IF NEEDDED CHECK");
			if (action.payload === "player2") {
				state.player1.isTurn = false;
				state.player2.isTurn = true;
			} else if (action.payload === "player1") {
				state.player2.isTurn = false;
				state.player1.isTurn = true;
			}
			state.gamePhases.summonPhase = true;
		},
		setDrawPhase(state, action) {
			action.payload === true ? (state.gamePhases.drawPhase = true) : (state.gamePhases.drawPhase = false);
		},
		setBattlephase(state, action) {
			action.payload === true ? (state.gamePhases.battlePhase = true) : (state.gamePhases.battlePhase = false);
		},
		setSummonPhase(state, action) {
			action.payload === true ? (state.gamePhases.summonPhase = true) : (state.gamePhases.summonPhase = false);
		},
		setHasSummoned(state, action) {
			action.payload === true ? (state.hasSummoned = true) : (state.hasSummoned = false);
		},
		//END TURN LOGIC - CHANGE STATES BACK / RESET HAS ATTACKED BOOLEAN ON PLAYING CARDS / RESET ATTACKER/DEFENDER / INCREASE TURN COUNT //
		endTurn(state) {
			state.gamePhases.drawPhase = true;
			state.gamePhases.battlePhase = false;
			state.gamePhases.summonPhase = false;
			state.player1.hasSummoned = false;
			state.player2.hasSummoned = false;

			for (let fs in state.player1.fieldSlots) {
				if (state.player1.fieldSlots[fs].hasAttacked) {
					state.player1.fieldSlots[fs].hasAttacked = false;
				}
			}

			for (let fs in state.player2.fieldSlots) {
				if (state.player2.fieldSlots[fs].hasAttacked) {
					state.player2.fieldSlots[fs].hasAttacked = false;
				}
			}
			state.attacker = {};
			state.defender = {};
			state.gamePhases.turn = state.gamePhases.turn + 1;

			if (state.player1.isTurn) {
				state.player1.isTurn = false;
				state.player2.isTurn = true;
			} else if (state.player2.isTurn) {
				state.player1.isTurn = true;
				state.player2.isTurn = false;
			}
		},

		aiEndTurn(state, action) {
			state.gamePhases.drawPhase = true;
			state.gamePhases.battlePhase = false;
			state.gamePhases.summonPhase = false;
			state.player2.hasSummoned = false;
			state.gamePhases.turn = state.gamePhases.turn + 1;

			for (let fs in state.player2.fieldSlots) {
				if (state.player2.fieldSlots[fs].id) {
					state.player2.fieldSlots[fs].hasAttacked = false;
				}
			}

			state.player1.isTurn = true;
			state.player2.isTurn = false;
		},
		exitGame(state, action) {
			console.log(state, playerInitialState);
			state.player1 = playerInitialState.player1;
			state.player2 = playerInitialState.player2;
			state.gamePhases = playerInitialState.gamePhases;
			console.log(state.player1, state.player2);
		},
		// setWinner(state) {
		// 	state.winner = true;
		// },
		//********************************************TRIBUTE SUMMON LOGIC*********************************/
		//SET SELECTED CARD THAT WILL BE TRIBUTE SUMMONED//
		setSelectedCard(state, action) {
			if (!action.payload) {
				state.selectedCard = [];
			} else {
				state.selectedCard = action.payload.card;
			}
			console.log(state.selectedCard);
		},
		//CARD TRIBUTE SUMMON FUNCTIONS//
		setIsTributing(state, action) {
			action.payload = true ? (state.isTributing = true) : (state.isTributing = false);
		},
		//set all tribute booleans to false//
		setTributesToFalse(state) {
			state.isTributing = false;
			state.canTributeSummon = false;
		},
		clearSelectedTributes(state) {
			state.tributes = [];
		},
		//set boolean flag for tribute summon button//
		setTributePrompt(state, action) {
			action.payload === true ? (state.tributePrompt = true) : (state.tributePrompt = false);
		},
		selectTributes(state, action) {
			console.log("select tribute fn fired!");
			const tributes = [...state.tributes, action.payload.card];
			state.tributes = tributes;

			console.log(state.tributes);
			if (state.tributes.length === state.selectedCard.tributesRequired) {
				console.log("tribute arry length check!");
				state.canTributeSummon = true;
				state.tributePrompt = true;
			}
		},
		removeTributedCards(state, action) {
			const sendToGraveyard = (tribute) => {
				if (tribute.slot === "p1s1") {
					state.player1.graveyard.push(state.player1.fieldSlots.fs1);
					state.player1.fieldSlots.fs1 = {};
				} else if (tribute.slot === "p1s2") {
					state.player1.graveyard.push(state.player1.fieldSlots.fs2);
					state.player1.fieldSlots.fs2 = {};
				} else if (tribute.slot === "p1s3") {
					state.player1.graveyard.push(state.player1.fieldSlots.fs3);
					state.player1.fieldSlots.fs3 = {};
				} else if (tribute.slot === "p2s1") {
					state.player2.graveyard.push(state.player2.fieldSlots.fs1);
					state.player2.fieldSlots.fs1 = {};
				} else if (tribute.slot === "p2s2") {
					state.player2.graveyard.push(state.player2.fieldSlots.fs2);
					state.player2.fieldSlots.fs2 = {};
				} else if (tribute.slot === "p2s3") {
					state.player2.graveyard.push(state.player2.fieldSlots.fs3);
					state.player2.fieldSlots.fs3 = {};
				}
			};
			console.log("remove tribute check");
			state.tributes.forEach((tribute) => {
				sendToGraveyard(tribute);
				state.battleLog.push(`${tribute.name} was tributed and sent to the graveyard`);
			});
			state.isTributing = false;
			state.canTributeSummon = false;
			state.tributes = [];
		},
		//AI LOGIC SETTERS/FUNCTIONS//
		activateAi(state, action) {
			action.payload === true ? (state.aiPlaying = true) : (state.aiPlaying = false);
		},

		setAttackerDefender(state, action) {
			state.attacker = [...state.attacker, action.payload.attacker, action.payload.atkId];
			state.defender = [...state.defender, action.payload.defender, action.payload.defId];
			console.log(state.attacker, state.defender);
		},

		setTributes(state, action) {
			state.tributes.push(action.payload.selectedCard);
			console.log("tributes:", state.tributes);
		},

		addToBattleLog(state, action) {
			console.log("add to battle log fired");
			if (action.payload) {
				if (action.payload.card) {
					console.log("activate battle log");

					const owner = action.payload.card.owner === "p1" ? "Player 1" : "Player 2";
					state.battleLog.push(`${owner} activated ${action.payload.card.name}!`);
				}
				if (action.payload.lostLp) {
					console.log("activate lost lifepoints");

					const player = action.payload.player === "p1" ? "Player 1" : "Player 2";
					state.battleLog.push(`${player} lost ${action.payload.lostLp} lifepoints!`);
				}
				if (action.payload.gainedLp) {
					console.log("activate gained lifepiints");

					const player = action.payload.player === "p1" ? "Player 1" : "Player 2";
					state.battleLog.push(`${player} gained ${action.payload.gainedLp} lifepoints!`);
				}
				if (action.payload.message) {
					console.log("BATTLELOG MESSAGE:", `${action.payload.message}`);
					state.battleLog.push(`${action.payload.message}`);
				}

				if (action.payload.directTarget) {
					const target = action.payload.directTarget === "p1" ? "Player 1" : "Player 2";

					state.battleLog.push(`${state.attacker.name} attacked ${target}'s lifepoints directly!`);
				}
			} else {
				if (state.attacker.name && state.defender.name) {
					console.log("activate attacked log");

					state.battleLog.push(`${state.attacker.name} attacked ${state.defender.name}`);
				}
			}
		},
	},
});

export const store = configureStore({
	reducer: { player: playerSlice.reducer },
});

export const playerActions = playerSlice.actions;
