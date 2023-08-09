import React, { Fragment, useState, useEffect, useContext } from "react";
import { useAxios } from "../../../../hooks/axios-hook";
import Deck from "../Deck";
import { standardDecks } from "../../../Decks/Decks";

import AuthContext from "../../../../context/auth-context";
import Button from "../../Button";
import LoadingSpinner from "../../LoadingSpinner";
import classes from "./ViewDecksDisplay.module.css";
import useNotification from "../../../../hooks/notification-hook";

const ViewDecksDisplay = (props) => {
	const auth = useContext(AuthContext);
	const { showError, showPending, showSuccess } = useNotification();
	const [deckList, setDeckList] = useState("");
	const [deckId, setDeckId] = useState("");
	const { sendRequest, isLoading } = useAxios();
	const [sortedByLength, setSortedByLength] = useState(false);

	const userId = auth.userId;
	useEffect(() => {
		//function to get list of decks and deckID belonging to user//
		const getDeckList = async () => {
			const response = await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/deck/user/${userId}`, "get");
			const listOfDecks = response.data.decks;
			console.log(response);
			console.log(response.data.decks);

			setDeckList(listOfDecks);
		};
		if (auth.isLoggedIn) {
			try {
				getDeckList();
			} catch (err) {
				console.log(err);
				console.log(err.response.data);
			}
		}
	}, [sendRequest, userId, auth.isLoggedIn]);

	const confirmHandler = async () => {
		//if deck menu is being used to delete a deck from user//
		if (props.forDeletion) {
			console.log("delete handler reached");
			showPending({ title: "Delete Deck", message: "Deleting deck, please wait..." });
			try {
				const response = await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/deck/${deckId}`, "delete");
				console.log(response, response.message);
				console.log(response);
				const updatedDeckList = deckList.filter((deck) => deck.id !== deckId);
				setDeckList(updatedDeckList);
				setDeckId("");
				showSuccess({ title: "Delete Deck", message: "Successfully deleted deck!" });
			} catch (err) {
				console.log(err);
				showError({ title: "Deleting Deck", message: "Deleting deck failed, please try again..." });
			}
		} else if (props.forDuel) {
			console.log("duel");
			props.getDeckId(deckId);
		} else if (props.createCard || props.forView) {
			props.getDeckId(deckId);
		}
	};

	console.log(deckId);
	console.log(deckList);

	const getDeckId = (deckId) => {
		setDeckId(deckId);
	};

	//function to highlight li when selected by user//
	const highlightLi = (e) => {
		console.log(e.target);
		for (const child of e.target.parentNode.children) {
			child.className = "";
		}
		e.target.className = classes.selected;
	};

	let headerContent;
	if (props.forDuel) {
		headerContent = "Select Your Deck";
	} else if (props.forDeletion) {
		headerContent = "Select Deck To Be Deleted";
	} else if (props.createCard) {
		headerContent = "Select Deck To Add Card";
	} else if (props.forView) {
		headerContent = "Select Deck To View Cards";
	}

	if (props.forDuel && deckList.length && !sortedByLength) {
		const decksForDuel = [];
		deckList.forEach((deck) => {
			console.log(deck);

			if (deck.length >= 10) {
				decksForDuel.push(deck);
			}
		});
		setDeckList(decksForDuel);
		setSortedByLength(true);
	}

	return (
		<div className={classes.display}>
			<h2>{headerContent}</h2>
			{props.forDuel && auth.isLoggedIn && <p className={classes.message}>Custom decks must have at least 10 cards to be played</p>}
			<div className={classes.decksContainer}>
				<ul onClick={highlightLi}>
					{!props.createCard && !props.forDeletion && !props.forView && <p>Standard Decks</p>}
					{!props.createCard && !props.forDeletion && !props.forView && standardDecks.map((deck, index) => <Deck listStyle key={index} id={deck.name} name={deck.name} getDeckId={getDeckId} />)}

					{auth.isLoggedIn && (
						<div>
							<p>Custom Decks</p>
							{isLoading && <LoadingSpinner />}
							{!isLoading && deckList.length && deckList.map((deck, index) => <Deck listStyle key={deck.id} id={deck.id} name={deck.name.toUpperCase()} getDeckId={getDeckId} />)}
							{!deckList.length && !isLoading && <p className={classes.message}>No custom decks</p>}
						</div>
					)}
				</ul>
			</div>
			<div className={classes.buttonContainer}>
				<Button onClick={confirmHandler} backBtn disabled={!deckId}>
					Confirm
				</Button>
				<Button backBtn onClick={props.back}>
					Back
				</Button>
			</div>
		</div>
	);
};

export default ViewDecksDisplay;
