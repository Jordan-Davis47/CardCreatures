import { useSelector } from "react-redux";
import Modal from "./Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHandsHoldingCircle, faXmark } from "@fortawesome/free-solid-svg-icons";
import classes from "./TributeDisplay.module.css";
import Card from "../Card";

const TributeDisplay = (props) => {
	const tributes = useSelector((state) => state.player.tributes);

	console.log(tributes);

	return (
		<Modal onClose={props.onClose} onCancel={props.onCancel}>
			<div className={classes.tributeDisplay}>
				<p className={classes.headerText}>Would you like to tribute summon?</p>
				<p>Tribute:</p>
				<div className={classes.tributeCardsContainer}>
					{tributes.map((card) => (
						<Card key={card.id} className="tributingCard" name={card.name} atk={card.atk} def={card.def} src={card.img} type={card.type} />
					))}
				</div>

				<div className={classes.summoningCardContainer}>
					<p>For:</p>
					<Card className="summoningCard" name={props.selectedCard.name} atk={props.selectedCard.atk} def={props.selectedCard.def} src={props.selectedCard.img} type={props.selectedCard.type} />
				</div>

				<div className={classes.buttonsContainer}>
					<div className={classes.tributeButtonContainer}>
						<FontAwesomeIcon className={classes.tributeSummonIcon} icon={faHandsHoldingCircle} onClick={props.onTributeSelect} />
						<p>Tribute</p>
					</div>
					<div className={classes.cancelButtonContainer}>
						<FontAwesomeIcon className={classes.cancelIcon} icon={faXmark} onClick={props.onCancel} />
						<p>Cancel</p>
					</div>
				</div>
			</div>
		</Modal>
	);
};

export default TributeDisplay;
