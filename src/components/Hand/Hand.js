import { Fragment } from "react";
import { useSelector } from "react-redux";
import useHand from "../../hooks/hand-hook";

import Card from "../Card";
import Modal from "../UI/Modal";
import CardDisplay from "../UI/CardDisplay";
import PopUpBox from "../UI/PopUpBox";
import { useSpell } from "../../hooks/spellCard-hook";

import classes from "./Hand.module.css";
import styles from "../UI/Animations.module.css";
import { TransitionGroup, CSSTransition } from "react-transition-group";

let inspect;

const Hand = (props) => {
	const state = useSelector((state) => state.player);
	const { selectCard, PlaceCardDown, spellActivationHandler, closeModal, selectedCard, hasSelectedCard, isSpellCard, isTrapCard } = useHand();
	const { message, clearMessage } = useSpell();

	const transitionClasses = { enter: styles.enter, enterActive: "animate__animated animate__backInLeft", exitActive: "animate__animated animate__fadeOut" };

	let handClasses = props.id === "p1" ? classes.hand1 : classes.hand2;
	if (props.hand) {
		handClasses = props.hand.length ? `${handClasses}` : `${classes.hide}`;
	}

	return (
		<Fragment>
			{hasSelectedCard && (
				<CardDisplay onClose={closeModal} inspect={inspect} selectedCard={selectedCard} hasSelectedCard={hasSelectedCard} isSpellCard={isSpellCard} isTrapCard={isTrapCard} PlaceCardDown={PlaceCardDown} useSpell={spellActivationHandler} />
			)}
			{/* PLAYER HAND */}
			<div id={props.id} className={handClasses}>
				<TransitionGroup component={null}>
					{props.hand &&
						props.hand.map((card, index) => (
							<CSSTransition key={card.id} timeout={3000} classNames={transitionClasses} mountOnEnter unmountOnExit>
								<Card zIndex={index} key={card.id} id={card.id} name={card.name} atk={card.atk} def={card.def} src={card.img} type={card.type} effect={card.effect} getId={selectCard} />
							</CSSTransition>
						))}
				</TransitionGroup>
			</div>
			{message && (
				<Modal>
					<PopUpBox message={message} onClose={clearMessage} />
				</Modal>
			)}
		</Fragment>
	);
};

export default Hand;
