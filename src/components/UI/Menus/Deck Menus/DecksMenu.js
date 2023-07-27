import React, { useState, useContext } from "react";

import AuthContext from "../../../../context/auth-context";

import Button from "../../Button";
import CreateCard from "../../Forms/CreateCard";

import CreateDeckMenu from "./CreateDeckMenu";
import ViewDecksDisplay from "./ViewDecksDisplay";
import ViewCards from "../ViewCards";
import Container from "../../Layout/Container";

const DecksMenu = (props) => {
	const [showDecksForView, setShowDecksForView] = useState(false);
	const [showDecksForDeletion, setShowDecksForDeletion] = useState(false);
	const [showCreateDeckMenu, setShowCreateDeckMenu] = useState(false);
	const [showCreateCardMenu, setShowCreateCardMenu] = useState(false);
	const auth = useContext(AuthContext);

	const showDecksForViewHandler = () => {
		setShowDecksForView(true);
	};

	const hideDecksForViewHandler = () => {
		setShowDecksForView(false);
	};

	const showDecksForDeletionDisplayHandler = () => {
		setShowDecksForDeletion(true);
	};

	const hideDecksForDeletionHandler = () => {
		setShowDecksForDeletion(false);
	};

	const showCreateDeckHandler = () => {
		setShowCreateDeckMenu(true);
	};

	const hideCreateDeckHandler = () => {
		setShowCreateDeckMenu(false);
	};

	const showCreateCardHandler = () => {
		setShowCreateCardMenu(true);
	};

	const hideCreateCardHandler = () => {
		setShowCreateCardMenu(false);
	};

	return (
		<Container>
			{!auth.isLoggedIn && !showCreateDeckMenu && (
				<div>
					<p>You must be logged in to use these features</p>
				</div>
			)}
			{!showDecksForView && !showDecksForDeletion && !showCreateCardMenu && !showCreateDeckMenu && (
				<Button menuBtn onClick={showDecksForViewHandler} disabled={!auth.isLoggedIn}>
					View Decks
				</Button>
			)}
			{!showDecksForView && !showDecksForDeletion && !showCreateCardMenu && !showCreateDeckMenu && (
				<Button menuBtn onClick={showCreateDeckHandler} disabled={!auth.isLoggedIn}>
					Create Deck
				</Button>
			)}
			{!showDecksForView && !showDecksForDeletion && !showCreateCardMenu && !showCreateDeckMenu && (
				<Button menuBtn onClick={showCreateCardHandler} disabled={!auth.isLoggedIn}>
					Create Card
				</Button>
			)}
			{!showDecksForView && !showDecksForDeletion && !showCreateCardMenu && !showCreateDeckMenu && (
				<Button onClick={showDecksForDeletionDisplayHandler} menuBtn disabled={!auth.isLoggedIn}>
					Delete Deck
				</Button>
			)}

			{!showDecksForView && !showDecksForDeletion && !showCreateCardMenu && !showCreateDeckMenu && (
				<Button menuBtn onClick={props.back}>
					Main Menu
				</Button>
			)}

			{showDecksForView && <ViewCards back={hideDecksForViewHandler} />}
			{showDecksForDeletion && <ViewDecksDisplay forDeletion back={hideDecksForDeletionHandler} />}
			{showCreateDeckMenu && <CreateDeckMenu closeMenu={hideCreateDeckHandler} />}
			{showCreateCardMenu && <CreateCard forCreate back={hideCreateCardHandler} />}
		</Container>
	);
};

export default DecksMenu;
