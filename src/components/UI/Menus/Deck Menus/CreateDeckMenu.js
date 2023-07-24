import React, { useState, useContext } from "react";

import { useAxios } from "../../../../hooks/axios-hook";
import useNotification from "../../../../hooks/notification-hook";
import AuthContext from "../../../../context/auth-context";
import Modal from "../../Modal";
import Button from "../../Button";

import classes from "./CreateDeckMenu.module.css";

const CreateDeckMenu = (props) => {
	const { showError, showPending, showSuccess } = useNotification();
	const [deckName, setDeckName] = useState();
	const [showResponse, setShowResponse] = useState(false);
	const [responseMessage, setResponseMessage] = useState("");
	const { sendRequest, isLoading, error } = useAxios();
	const auth = useContext(AuthContext);

	const sendDeckData = async (name, userId) => {
		showPending({ title: "Create Deck", message: "Creating new deck, please wait..." });
		console.log(deckName);
		const response = await sendRequest("http://localhost:9000/api/deck/createDeck", "post", { name, userId }, { "Content-Type": "application/json" });

		console.log(response);
		if (response.status === 201) {
			console.log("succces");
			showSuccess({ title: "Create Deck", message: "Successfully created deck!" });
		} else if (error) {
			showError({ title: "Create Deck", message: "Failed to create deck, please try again..." });
		}
	};

	function createDeckHandler(e) {
		e.preventDefault();
		sendDeckData(deckName, auth.userId);
	}

	function setDeckNameHandler(e) {
		setDeckName(e.target.value);
	}

	return (
		<div className={classes.createDeckContainer}>
			<form onSubmit={createDeckHandler}>
				<label htmlFor="deckName">Deck Name</label>
				<input name="deckName" type="text" onChange={setDeckNameHandler} />
				<Button formBtn>Create</Button>
				<Button backBtn type="button" onClick={props.closeMenu}>
					Cancel
				</Button>
			</form>
		</div>
	);
};

export default CreateDeckMenu;
