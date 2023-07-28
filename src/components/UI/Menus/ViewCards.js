import React, { Fragment, useState, useEffect, useContext } from "react";

import AuthContext from "../../../context/auth-context";
import { useAxios } from "../../../hooks/axios-hook";
import useNotification from "../../../hooks/notification-hook";
import Card from "../../Card";
import CardDisplay from "../CardDisplay";
import ViewDecksDisplay from "./Deck Menus/ViewDecksDisplay";
import Button from "../Button";

import classes from "./ViewCards.module.css";

import CardForm from "../Forms/CreateCard Form/CardForm";
import LoadingSpinner from "../LoadingSpinner";

const ViewCards = (props) => {
	const auth = useContext(AuthContext);
	const { sendRequest, isLoading } = useAxios();
	const { showSuccess, showPending, showError } = useNotification();
	const [cards, setCards] = useState(null);
	const [focusedCard, setFocusedCard] = useState({});
	const [showFocusedCard, setShowFocusedCard] = useState(false);
	const [showList, setShowList] = useState(false);
	const [showEditCard, setShowEditCard] = useState(false);
	const [cardId, setCardId] = useState("");
	const [deckId, setDeckId] = useState(null);
	const [deckPoints, setDeckPoints] = useState(null);
	const [reloadPoints, setReloadPoints] = useState(true);

	useEffect(() => {
		if (reloadPoints) {
			const getUserPoints = async () => {
				try {
					const response = await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/users/deckPoints/${auth.userId}`, "get");
					console.log(response);
					console.log(response.data);
					setDeckPoints(response.data.deckPoints);
				} catch (err) {
					console.log(err);
					showError({ title: "Error", message: "Error retrieving user data" });
				}
				setReloadPoints(false);
			};
			getUserPoints();
		}
	}, [sendRequest, auth.userId, showError, reloadPoints]);

	const closeFormHandler = () => {
		setShowEditCard(false);
		setShowEditCard(false);
		setShowList(true);
	};

	const getCards = async (deckId) => {
		console.log(deckId);
		const response = await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/deck/${deckId}`, "get");
		setCards(response.data.cards);
		setShowList(true);
	};

	const deleteCardHandler = () => {
		const response = sendRequest(`${process.env.REACT_APP_BACKEND_URL}/deck/card/${cardId}`, "delete");
		const updatedCards = cards.filter((card) => card._id !== cardId);
		setCards(updatedCards);
		setShowFocusedCard(false);
		setCardId("");
		console.log(updatedCards);
	};

	const submitFormHandler = async (card, file) => {
		console.log(card, file);
		console.log(cardId);
		showPending({ title: "Edit Card", message: "Editing card, please wait..." });

		if (file) {
			try {
				const cloudinaryData = new FormData();
				cloudinaryData.append("file", file);
				cloudinaryData.append("upload_preset", `${process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET}`);
				cloudinaryData.append("folder", "Card game images");
				const cloudinaryURL = `${process.env.REACT_APP_CLOUDINARY_BASE_URL}/image/upload`;

				console.log(cloudinaryURL);
				const cloudinaryResponse = await sendRequest(cloudinaryURL, "post", cloudinaryData);
				console.log(cloudinaryResponse);
				const uploadedImageUrl = cloudinaryResponse.data.url;

				card.img = uploadedImageUrl;
			} catch (err) {
				showError({ title: "Creating Card", message: "Failed to create card, please try again" });
			}
		}

		const response = await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/deck/card/${cardId}`, "patch", card, { "Content-type": "application/json" });
		console.log("RESPONSE:", response);
		if (response.status === 200) {
			showSuccess({ title: "Edit Card", message: "Successfully edited card!" });
			setShowList(true);
			setShowEditCard(false);
			getCards(deckId);
			setReloadPoints(true);
		}
	};

	const editCardHandler = () => {
		setShowEditCard(true);
		setShowList(false);
		setShowFocusedCard(false);
	};

	const loadCards = (deckId) => {
		setDeckId(deckId);
		getCards(deckId);
	};

	const focusedCardHandler = (id) => {
		setCardId(id);
		const cardToView = cards.find((card) => card._id === id);
		setFocusedCard(cardToView);
		setShowFocusedCard(true);
	};

	const unfocusCard = () => {
		setShowFocusedCard(false);
	};

	const viewButtons = (
		<div className={classes.btnContainer}>
			<Button onClick={editCardHandler} backBtn>
				Edit
			</Button>
			<Button onClick={deleteCardHandler} backBtn>
				Delete
			</Button>
			<Button onClick={unfocusCard} backBtn>
				Back
			</Button>
		</div>
	);

	const initialValues = {
		name: focusedCard.name,
		atk: focusedCard.atk,
		def: focusedCard.def,
		spellAmount: focusedCard.effect ? focusedCard.effect.amount : null,
		description: focusedCard.cardDescription,
		src: focusedCard.img,
		type: focusedCard.type,
		id: focusedCard._id,
	};

	console.log(focusedCard);

	return (
		<Fragment>
			{isLoading && !showEditCard && <LoadingSpinner />}
			{!isLoading && !cards && <ViewDecksDisplay forView getDeckId={loadCards} back={props.back} />}
			{!showEditCard && cards && (
				<div className={classes.container}>
					<ul className={classes.cardList}>
						{showList && cards.map((card) => <Card getId={focusedCardHandler} key={card._id} id={card._id} type={card.type} name={card.name} atk={card.atk} def={card.def} src={card.img} description={card.cardDescription} effect={card.effect} />)}
					</ul>
				</div>
			)}

			{showEditCard && (
				<div className={classes.formContainer}>
					<CardForm initialValue={initialValues} deckId={deckId} onBack={closeFormHandler} onSubmit={submitFormHandler} points={deckPoints} forEdit />
				</div>
			)}

			{showFocusedCard && (
				<div className={classes.focusedCardContainer}>
					<CardDisplay selectedCard={focusedCard} viewButtons={viewButtons} />
				</div>
			)}
			{showList && (
				<Button onClick={props.back} className={classes.backBtn} backBtn>
					Back
				</Button>
			)}
		</Fragment>
	);
};

export default ViewCards;
