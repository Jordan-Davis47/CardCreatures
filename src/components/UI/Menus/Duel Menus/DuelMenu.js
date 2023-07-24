import { Fragment, useState } from "react";
import DeckSelectMenu from "../Deck Menus/DeckSelectMenu";
import Container from "../../Layout/Container";
import classes from "./DuelMenu.module.css";
import Button from "../../Button";
import ViewDecksDisplay from "../Deck Menus/ViewDecksDisplay";

const DuelMenu = (props) => {
	const [showDeckMenu, setShowDeckMenu] = useState(false);
	const [matchType, setMatchType] = useState("");

	function showDeckMenuHandler(e) {
		setMatchType(e.target.textContent);
		// console.log(e.target.textContent);
		setShowDeckMenu(true);
	}
	function closeDeckMenuHandler() {
		setShowDeckMenu(false);
	}
	return (
		<Container>
			{!showDeckMenu && (
				<Button menuBtn onClick={showDeckMenuHandler}>
					Single Player
				</Button>
			)}
			{!showDeckMenu && (
				<Button menuBtn onClick={showDeckMenuHandler}>
					Local Multiplayer
				</Button>
			)}
			{!showDeckMenu && (
				<Button menuBtn onClick={props.onClose}>
					Main Menu
				</Button>
			)}
			{showDeckMenu && <DeckSelectMenu back={closeDeckMenuHandler} onPickDeck={props.onPickDeck} matchType={matchType} />}
		</Container>
	);
};

export default DuelMenu;
