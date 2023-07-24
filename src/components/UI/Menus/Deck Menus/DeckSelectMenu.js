import { Fragment, useState, useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAxios } from "../../../../hooks/axios-hook";
import { playerActions } from "../../../../store/index";
import { standardDecks } from "../../../Decks/Decks";
import Button from "../../Button";
import AuthContext from "../../../../context/auth-context";
import ViewDecksDisplay from "./ViewDecksDisplay";
import Modal from "../../Modal";

import classes from "./DeckSelectMenu.module.css";
// const classes = {};

const DeckSelectMenu = (props) => {
	const dispatch = useDispatch();
	const { sendRequest, isLoading, error, message } = useAxios();
	const auth = useContext(AuthContext);
	const [deckIsSelected, setDeckIsSelected] = useState(false);
	const [player1Deck, setPlayer1Deck] = useState([]);
	const [player1Choice, setPlayer1Choice] = useState("");
	const [player2Deck, setPlayer2Deck] = useState([]);
	const [player2Choice, setPlayer2Choice] = useState("");

	const dragonDeck = standardDecks[0].cards;
	const natureDeck = standardDecks[1].cards;

	const getCards = async (deckId) => {
		console.log(deckId);
		if (deckIsSelected) {
			return;
		}
		if (deckId === "DRAGON DECK") {
			if (props.matchType === "Single Player" || !player1Deck.length) {
				setPlayer1Deck(dragonDeck);
				setPlayer1Choice(standardDecks[0].name);
			} else {
				setPlayer2Deck(dragonDeck);
				setPlayer2Choice(standardDecks[0].name);
			}
		} else if (deckId === "NATURE DECK") {
			if (props.matchType === "Single Player" || !player1Deck.length) {
				setPlayer1Deck(natureDeck);
				setPlayer1Choice(standardDecks[1].name);
			} else {
				setPlayer2Deck(natureDeck);
				setPlayer2Choice(standardDecks[1].name);
			}
		} else {
			console.log(deckId);
			const response = await sendRequest(`http://localhost:9000/api/deck/${deckId}`, "get");
			console.log(response);
			if (props.matchType === "Single Player" || !player1Deck.length) {
				setPlayer1Deck(response.data.cards);
				setPlayer1Choice(response.data.deckName);
			} else {
				setPlayer2Deck(response.data.cards);
				setPlayer2Choice(response.data.deckName);
			}
		}
	};

	const deckSelectHandler = (deckId) => {
		console.log("matchtype:", props.matchType);
		if (props.matchType === "Single Player") {
			getCards(deckId);
			setDeckIsSelected(true);
		}
		if (props.matchType === "Local Multiplayer") {
			getCards(deckId);
		}
	};

	const clearDecks = () => {
		setPlayer1Choice("");
		setPlayer2Choice("");
		setPlayer1Deck([]);
		setPlayer2Deck([]);
		setDeckIsSelected(false);
	};

	useEffect(() => {
		if (player1Deck.length & player2Deck.length) {
			console.log("length passed");
			setDeckIsSelected(true);
		}
	}, [player1Deck.length, player2Deck.length]);

	function startMatchHandler() {
		if (props.matchType === "Single Player") {
			dispatch(playerActions.activateAi(true));
			dispatch(playerActions.setPlayerDeck({ player: "player1", deck: player1Deck }));
			dispatch(playerActions.setPlayerDeck({ player: "player2", deck: dragonDeck }));
			props.onPickDeck();
		}
		if (props.matchType === "Local Multiplayer") {
			dispatch(playerActions.setPlayerDeck({ player: "player1", deck: player1Deck }));
			dispatch(playerActions.setPlayerDeck({ player: "player2", deck: player2Deck }));
			dispatch(playerActions.activateAi(false));
			props.onPickDeck();
		}
	}

	let username = !auth.isLoggedIn ? "Player 1" : auth.username;

	const containerClass = deckIsSelected ? ` ${classes.choiceContainerModalView}` : `${classes.choiceContainer}`;

	console.log("decks:", player1Deck, player2Deck);
	console.log(auth.username);

	return (
		<Fragment>
			{(player1Choice || player2Choice) && !deckIsSelected && (
				<div className={containerClass}>
					{player1Choice && (
						<div className={classes.player1Choice}>
							<p>{username}</p>
							<p>{player1Choice}</p>
						</div>
					)}
					{player2Choice && (
						<div className={classes.player2Choice}>
							<p>Player 2</p>
							<p>{player2Choice}</p>
						</div>
					)}
				</div>
			)}
			<ViewDecksDisplay forDuel getDeckId={deckSelectHandler} back={props.back} />
			{deckIsSelected && (
				<Modal>
					<div className={classes.startContainer}>
						<h1>Ready To Duel?</h1>
						<div className={containerClass}>
							{player1Choice && (
								<div className={classes.player1Choice}>
									<p>{username}</p>
									<p>{player1Choice}</p>
								</div>
							)}
							{player2Choice && (
								<div className={classes.player2Choice}>
									<p>Player 2</p>
									<p>{player2Choice}</p>
								</div>
							)}
						</div>
						<div className={classes.buttonContainer}>
							<Button formBtn onClick={startMatchHandler}>
								Start Match
							</Button>
							<Button backBtn onClick={clearDecks} disabled={!player1Choice & !player2Choice}>
								Clear Selections
							</Button>
						</div>
					</div>
				</Modal>
			)}
		</Fragment>
	);
};

export default DeckSelectMenu;
