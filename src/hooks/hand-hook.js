import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { playerActions } from "../store/index";
import { useSpell } from "../hooks/spellCard-hook";

const useHand = () => {
	const dispatch = useDispatch();
	const { activateSpell, message, clearMessage } = useSpell();
	const gameState = useSelector((state) => state.player);
	const [selectedCard, setSelectedCard] = useState(null);
	const [hasSelectedCard, setHasSelectedCard] = useState(false);
	const [isSpellCard, setIsSpellCard] = useState(false);
	const [isTrapCard, setIsTrapCard] = useState(false);

	const selectCard = (id) => {
		console.log("cardID:", id);
		if (selectedCard && hasSelectedCard) {
			setSelectedCard(null);
			setHasSelectedCard(false);

			return;
		}
		const card = gameState.player1.isTurn ? gameState.player1.hand.find((card) => card.id === id) : gameState.player2.hand.find((card) => card.id === id);
		console.log(card);
		if (!card) {
			return;
		}
		setSelectedCard(card);
		if ((gameState.player1.isTurn && card.owner === "p1") || (gameState.player2.isTurn && card.owner === "p2")) {
			console.log("SELECTED CARD IF CHECK");
			setHasSelectedCard(true);
		}
	};

	const PlaceCardDown = (event) => {
		const player = gameState.player1.isTurn ? "p1" : "p2";
		const playerHasSummoned = player === "p1" ? gameState.player1.hasSummoned : gameState.player2.hasSummoned;
		const position = event.target.id;
		console.log(position);
		let cardCopy = { ...selectedCard };
		position === "Defence" ? (cardCopy.position = "def") : (cardCopy.position = "atk");

		if (cardCopy.tributesRequired && !playerHasSummoned) {
			dispatch(playerActions.setIsTributing(true));
			dispatch(playerActions.setSelectedCard({ card: cardCopy }));
			setHasSelectedCard(false);

			return;
		}
		if (cardCopy.type === "trap") {
			cardCopy = { ...cardCopy, trapSet: true };
			dispatch(playerActions.placeCard({ card: cardCopy, player }));
			setHasSelectedCard(false);
			setIsTrapCard(false);
			return;
		}

		if (cardCopy.type === "spell") {
			dispatch(playerActions.placeCard({ card: cardCopy, player }));
			return;
		}

		dispatch(playerActions.placeCard({ card: cardCopy, player }));
		dispatch(playerActions.setTributesToFalse());
		setSelectedCard(null);
		setHasSelectedCard(false);
	};

	const spellActivationHandler = () => {
		console.log(selectedCard.effect.type);
		if (selectedCard.targetRequired) {
			dispatch(playerActions.setPlayerSpellCard({ card: selectedCard, player: selectedCard.owner }));
		} else if (selectedCard.effect.type === "field spell") {
			dispatch(playerActions.placeCard({ card: selectedCard, player: selectedCard.owner }));
		} else {
			activateSpell(selectedCard);
		}
		setHasSelectedCard(false);
	};

	function closeModal() {
		setIsSpellCard(false);
		setIsTrapCard(false);
		setHasSelectedCard(false);
		setSelectedCard(null);
	}

	return {
		selectCard,
		PlaceCardDown,
		spellActivationHandler,
		closeModal,
		selectedCard,
		hasSelectedCard,
		isSpellCard,
		isTrapCard,
	};
};

export default useHand;
