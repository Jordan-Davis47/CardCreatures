import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { playerActions } from "../../store/index";
import Modal from "./Modal";
import Card from "../Card";
import classes from "./TrapCardDisplay.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "../UI/Button";

import { faBolt, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useSpell } from "../../hooks/spellCard-hook";
import { useCalc } from "../../hooks/calc-hook";
import { useAi } from "../../hooks/Ai-hook";

const TrapCardsDisplay = (props) => {
	const dispatch = useDispatch();
	const { activateSpell } = useSpell();
	const { battleCalculation } = useCalc();
	const { setAttackFalse, setTrapIsActiveFalseHandler } = useAi();
	const [showMenu, setShowMenu] = useState(true);
	const [showCards, setShowCards] = useState(false);
	const [showConfirm, setShowConfirm] = useState(false);
	const [focusedCard, setFocusedCard] = useState([]);
	const state = useSelector((state) => state);
	const attacker = useSelector((state) => state.player.attacker);
	const player1 = useSelector((state) => state.player.player1);
	const player2 = useSelector((state) => state.player.player2);
	const p1Traps = [player1.trapSlots.ts1, player1.trapSlots.ts2, player1.trapSlots.ts3].filter((card) => card.id);
	const p2Traps = [player2.trapSlots.ts1, player2.trapSlots.ts2, player2.trapSlots.ts3].filter((card) => card.id);

	function activateTrapCardHandler() {
		console.log(focusedCard);
		const { currentLifePoints, negate } = activateSpell(focusedCard);
		console.log(currentLifePoints);
		console.log("state:", state, state.player, state.player.attacker);
		if (!negate) {
			battleCalculation(currentLifePoints, negate);
		} else {
			dispatch(playerActions.setHasAttacked({ slotId: attacker.slot }));
		}
		dispatch(playerActions.clearAttackerDefender());
		console.log(focusedCard.slot);
		dispatch(playerActions.clearFieldSlot({ slotIds: [focusedCard.slot] }));
		setShowConfirm(false);
		setShowCards(false);
		setAttackFalse();
		setTrapIsActiveFalseHandler();
		props.onClose();
	}

	const showTrapCards = () => {
		setShowCards(true);
		setShowMenu(false);
	};

	const confirmMenuHandler = (id) => {
		setShowConfirm(true);
		console.log(id);
		const traps = player1.isTurn ? p2Traps : p1Traps;
		const card = traps.filter((card) => card.id === id);
		setFocusedCard(card[0]);
		console.log(traps, card, focusedCard);
	};

	const closeConfirm = () => {
		setShowConfirm(false);
	};

	const cancelTrap = () => {
		setShowConfirm(false);
		setShowCards(false);
		battleCalculation();
		// dispatch(playerActions.clearAttackerDefender());
		setTrapIsActiveFalseHandler();
		props.onClose();
	};

	return (
		<Modal className={props.className}>
			{showMenu && !showConfirm && (
				<div className={classes.trapMenu}>
					<p>Your opponent is attacking!</p>
					<p>Would you like to activate a trap card?</p>
					<div>
						<Button backBtn onClick={showTrapCards}>
							YES
						</Button>
						<Button backBtn onClick={cancelTrap}>
							NO
						</Button>
					</div>
				</div>
			)}
			{showCards && !showConfirm && (
				<div className={classes.trapCardsContainer}>
					<h3>Choose a trap to activate</h3>
					<div className={classes.cardsList}>
						{player2.isTurn && p1Traps.map((card) => <Card id={card.id} key={card.id} name={card.name} src={card.img} effect={card.effect} type={card.type} getId={confirmMenuHandler} />)}
						{player1.isTurn && p2Traps.map((card) => <Card id={card.id} key={card.id} name={card.name} src={card.img} effect={card.effect} type={card.type} getId={confirmMenuHandler} />)}
					</div>
					<div>
						<Button backBtn onClick={cancelTrap}>
							Cancel
						</Button>
					</div>
				</div>
			)}
			{showConfirm && (
				<div className={classes.activatePrompt}>
					<div className={classes.focusedCardContainer}>
						<Card className="displayedTrapCard" id={focusedCard.id} key={focusedCard.id} name={focusedCard.name} src={focusedCard.img} effect={focusedCard.effect} type={focusedCard.type} />
						<p>{focusedCard.cardDescription}</p>
					</div>

					<div className={classes.buttonContainer}>
						<div>
							<FontAwesomeIcon className={classes.boltIcon} icon={faBolt} onClick={activateTrapCardHandler} />
							<p>Activate Trap</p>
						</div>
						<div>
							<FontAwesomeIcon className={classes.cancelIcon} icon={faXmark} onClick={closeConfirm} />
							<p>Cancel</p>
						</div>
					</div>
				</div>
			)}
		</Modal>
	);
};

export default TrapCardsDisplay;
