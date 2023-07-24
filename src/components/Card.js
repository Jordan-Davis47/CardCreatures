import React, { useState } from "react";
import CSSTransition from "react-transition-group/CSSTransition";
import classes from "./Card.module.css";

const Card = (props) => {
	const cardNameClasses = props.inspect ? `${classes.name}` : `${classes.hide}`;

	let cardClasses = `${classes.card}`;

	if (props.position === "def") {
		cardClasses = `${classes.faceDownCard} ${classes.defencePosition} `;
	}
	if (props.type === "spell") {
		cardClasses = `${classes.card} ${classes.spellCard}`;
	}
	if (props.type === "trap") {
		cardClasses = `${classes.card} ${classes.trapCard}`;
	}
	if (props.trapSet) {
		cardClasses = `  ${classes.faceDownCard}`;
	}

	if (props.clicked) {
		if (props.position === "def") {
			cardClasses = `${classes.card} ${classes.defencePosition} ${classes.faceDownCard} ${classes.cardClicked}`;
		} else {
			cardClasses = `${classes.card} ${classes.cardClicked}`;
		}
	}
	if (props.className === "displayedCard") {
		cardClasses = ` ${classes.displayedCard}`;
	}
	if (props.className === "createDeckDisplayCard") {
		cardClasses = `${classes.createDeckDisplayCard}`;
	}
	if (props.className === "tributingCard") {
		cardClasses = `${classes.tributingCard}`;
	}
	if (props.className === "summoningCard") {
		cardClasses = `${classes.summoningCard}`;
	}
	if (props.className === "displayedTrapCard") {
		if (props.clicked) {
			cardClasses = ` ${classes.displayedTrapCard} ${classes.cardClicked}`;
		} else {
			cardClasses = `${classes.displayedTrapCard} `;
		}
	}

	const getCardId = () => {
		console.log("getCardId FN fired ");
		props.getId(props.id);
	};

	const clickHandler = props.getId ? getCardId : props.onClick;

	return (
		<div className={`${cardClasses} ${props.className}`} style={props.zIndex ? { zIndex: props.zIndex } : { zIndex: 1 }} onClick={clickHandler}>
			<div className={cardNameClasses}>{props.name}</div>
			<img alt="card monster" src={props.src} className={classes.cardImage} />
			<div className={classes.stats}>
				{props.type === "monster" && <div className={classes.atkStat}>{props.atk}</div>}
				{props.type === "monster" && <div className={classes.defStat}>{props.def}</div>}
				{props.type === "spell" && props.effect && <div className={classes.spellStat}>{props.effect.type}</div>}
				{props.type === "trap" && props.effect && <div className={classes.spellStat}>{props.effect.type}</div>}
			</div>
		</div>
	);
};

export default Card;
