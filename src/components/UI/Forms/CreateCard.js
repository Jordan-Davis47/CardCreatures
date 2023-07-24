import { Fragment, React, useEffect, useContext, useState } from "react";

import { useAxios } from "../../../hooks/axios-hook";
import useNotification from "../../../hooks/notification-hook";

import AuthContext from "../../../context/auth-context";

import classes from "./CreateCard.module.css";
import ViewDecksDisplay from "../Menus/Deck Menus/ViewDecksDisplay";

import CardForm from "./CreateCard Form/CardForm";

const CreateCard = (props) => {
	console.log(props, props.card);
	const { showSuccess, showPending, showError } = useNotification();
	const auth = useContext(AuthContext);
	const { sendRequest, isLoading, error, message, clearMessage } = useAxios();

	const [showCardCreateFrom, setShowCardCreateForm] = useState(props.forEdit ? true : false);
	const [showDeckList, setShowDeckList] = useState(props.forEdit ? false : true);
	const [deckId, setDeckId] = useState("");
	const [deckPoints, setDeckPoints] = useState(0);

	let initialValues = false;
	if (props.card) {
		initialValues = {
			name: props.card.name,
			atk: props.card.atk,
			def: props.card.def,
			spellAmount: props.card.effect ? props.card.effect.amount : null,
			description: props.card.cardDescription,
			src: props.card.img,
			type: props.card.type,
			id: props.card._id,
		};
	}

	const hideDeckListHandler = () => {
		setShowDeckList(false);
	};

	const createCardHandler = async (card, file) => {
		showPending({ title: "Create Card", message: "Creating new card, please wait..." });
		console.log("create check reached");
		console.log(file);
		let uploadedImageUrl;
		if (!file) {
			return;
		}
		try {
			const cloudinaryData = new FormData();
			cloudinaryData.append("file", file);
			cloudinaryData.append("upload_preset", `${process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET}`);
			cloudinaryData.append("folder", "Card game images");
			const cloudinaryURL = `${process.env.REACT_APP_CLOUDINARY_BASE_URL}/image/upload`;

			console.log(cloudinaryURL);
			const cloudinaryResponse = await sendRequest(cloudinaryURL, "post", cloudinaryData);
			console.log(cloudinaryResponse);
			uploadedImageUrl = cloudinaryResponse.data.url;

			card.img = uploadedImageUrl;
		} catch (err) {
			showError({ title: "Creating Card", message: "Failed to create card, please try again" });
		}
		try {
			const response = await sendRequest("http://localhost:9000/api/deck/createCard", "post", card, { "Content-type": "application/json" });
			console.log(response.data.message);
			console.log(response);
			showSuccess({ title: "Create Card", message: "Successfully created card!" });
		} catch (err) {
			showError({ title: "Creating Card", message: "Failed to create card, please try again" });
		}
	};

	// const editCardHandler = async (card) => {
	// 	showPending({ title: "Edit Card", message: "Editing card, please wait..." });
	// 	try {
	// 		const response = await sendRequest(`http://localhost:9000/api/deck/card/${props.card._id}`, "patch", card, { "Content-type": "application/json" });
	// 		console.log(response.data.message);
	// 		console.log(response);
	// 		showSuccess({ title: "Edit Card", message: "Successfully Edited card!" });
	// 	} catch (err) {
	// 		showError({ title: "Edit Card", message: "Failed to edit card, please try again" });
	// 	}
	// };

	function onSubmitHandler(card, file) {
		console.log("CARD:", card);
		if (props.forCreate) {
			createCardHandler(card, file);
		}
	}

	const getDeckId = (deckId) => {
		setDeckId(deckId);
		setShowDeckList(false);
		setShowCardCreateForm(true);
	};

	const cardCreateFormBackHandler = () => {
		setShowCardCreateForm(false);
		setShowDeckList(true);
	};

	useEffect(() => {
		if (auth.isLoggedIn) {
			const getUserPoints = async () => {
				try {
					const response = await sendRequest(`http://localhost:9000/api/users/deckPoints/${auth.userId}`, "get");
					console.log(response);
					console.log(response.data);
					setDeckPoints(response.data.deckPoints);
				} catch (err) {
					console.log(err);
				}
			};

			getUserPoints();
		}
	}, [sendRequest, auth.userId, auth.isLoggedIn]);

	console.log(deckPoints);

	return (
		<Fragment>
			{showDeckList && <ViewDecksDisplay createCard getDeckId={getDeckId} back={props.back} />}
			{showCardCreateFrom && (
				<div className={classes.createDeckMenu}>
					<CardForm onSubmit={onSubmitHandler} onBack={cardCreateFormBackHandler} initialValue={initialValues} deckId={deckId} />
				</div>
			)}
		</Fragment>
	);
};

export default CreateCard;
