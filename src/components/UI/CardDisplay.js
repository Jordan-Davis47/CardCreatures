import React, { Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";

import Card from "../Card";
import Button from "./Button";

import { playerActions } from "../../store/index";
import { ReactComponent as AtkPosIcon } from "../../Images/Icons/AtkPosIcon.svg";
import { ReactComponent as DefPosIcon } from "../../Images/Icons/defPosIcon.svg";
import { ReactComponent as SpellIcon } from "../../Images/Icons/spellIcon.svg";
import { ReactComponent as CardIcon } from "../../Images/Icons/cardIcon.svg";
import classes from "./CardDisplay.module.css";
import Modal from "./Modal";

const CardDisplay = (props) => {
	const battlePhase = useSelector((state) => state.player.battlePhase);
	const hasSummoned = useSelector((state) => state.player.hasSummoned);

	const isSpellCard = props.selectedCard.type === "spell";
	const isTrapCard = props.selectedCard.type === "trap";
	const isMonsterCard = props.selectedCard.type === "monster";

	console.log(props.selectedCard);

	return (
		<Modal onClose={props.onClose}>
			<div className={classes.cardDisplay}>
				<div className={classes.topContainer}>
					{props.selectedCard.tributesRequired && <p>This monster requires {props.selectedCard.tributesRequired} tribute(s) to summon!</p>}
					<h3>{props.selectedCard.name}</h3>
					<Card
						className={classes.displayedCard}
						name={props.selectedCard.name}
						atk={props.selectedCard.atk}
						def={props.selectedCard.def}
						src={props.selectedCard.img}
						type={props.selectedCard.type}
						effect={props.selectedCard.effect}
						inspect={props.inspect}
					/>
				</div>
				<div className={classes.buttonContainer}>
					{!battlePhase && !hasSummoned && props.hasSelectedCard && !isSpellCard && !isTrapCard && isMonsterCard && (
						<div className={classes.battleContainer}>
							<div>
								<AtkPosIcon id="atk" className={classes.atkPositionIcon} onClick={props.PlaceCardDown} />
								<p>Attack</p>
							</div>
							<div>
								<DefPosIcon id="def" className={classes.defPositionIcon} onClick={props.PlaceCardDown} />
								<p>Defence</p>
							</div>
						</div>
					)}
					{(isSpellCard || isTrapCard) && (
						<div className={classes.magicContainer}>
							{props.hasSelectedCard && isSpellCard && !isTrapCard && <SpellIcon className={classes.spellIcon} onClick={props.useSpell} />}
							{props.hasSelectedCard && isSpellCard && !isTrapCard && <p>Activate Spell</p>}
							{props.hasSelectedCard && !isSpellCard && isTrapCard && <CardIcon className={classes.trapIcon} onClick={props.PlaceCardDown} />}
							{props.hasSelectedCard && !isSpellCard && isTrapCard && <p>Set Trap Card</p>}
						</div>
					)}
				</div>

				<div className={classes.descriptionContainer}>{props.selectedCard.cardDescription}</div>
				{props.viewButtons && props.viewButtons}
			</div>
		</Modal>
	);
};

export default CardDisplay;
