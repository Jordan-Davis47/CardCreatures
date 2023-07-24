import React, { Fragment, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { CSSTransition, TransitionGroup } from "react-transition-group";

import Card from "../Card";
import TributeDisplay from "../UI/TributeDisplay";
import Modal from "../UI/Modal";
import "animate.css";
import styles from "../UI/Animations.module.css";
import classes from "./Cardslot.module.css";

const CardSlot = (props) => {
	const state = useSelector((state) => state.player);
	const [toggleTransition, setToggleTransition] = useState(false);
	const [uiClass, setUiClass] = useState(false);

	const getCard = () => {
		props.getCardInfo(props.card, props.id);
	};
	let onClick;
	if (props.fieldSlot) {
		onClick = getCard;
	} else {
		onClick = props.onClick;
	}

	const animationTiming = {
		enter: 2000,
		exit: 2000,
	};

	if (props.isPlaying === true && !toggleTransition) {
		setTimeout(() => {
			setToggleTransition(true);
		}, 100);
	}
	let slotClasses;

	console.log(state.attacker, props.id);
	console.log(state.attacker.slot === props.id);

	if (state.attacker.owner) {
		console.log("HIGHLIGHT CHECK");
		slotClasses = state.attacker.slot === props.id ? classes.attacker : "";
	}

	if (state.defender.owner && state.defender.owner !== "lifePoints") {
		slotClasses = state.defender.slot.includes(props.id) ? classes.defender : "";
	}

	if (state.tributes.length) {
		const tributeSlots = [];
		state.tributes.forEach((trib) => tributeSlots.push(trib.slot));
		slotClasses = tributeSlots.includes(props.id) ? classes.tribute : "";
	}

	return (
		<Fragment>
			<div className={`${props.className} ${slotClasses}`} onClick={onClick}>
				<TransitionGroup component={null}>
					{props.isPlaying && (
						<CSSTransition classNames={{ enterActive: "animate__animated animate__fadeIn", exitActive: "animate__animated animate__fadeOut" }} timeout={2000} mountOnEnter unmountOnExit>
							<Card name={props.card.name} atk={props.card.atk} def={props.card.def} src={props.card.img} position={props.card.position} type={props.card.type} trapSet={props.card.trapSet} />
						</CSSTransition>
					)}
				</TransitionGroup>
			</div>
			{/* {tributePrompt && (
				<Modal>
					<TributeDisplay onTributeSelect={getCard} selectedCard={selectedCard} cardOwner={props.owner} />
				</Modal>
			)} */}
		</Fragment>
	);
};

export default CardSlot;
