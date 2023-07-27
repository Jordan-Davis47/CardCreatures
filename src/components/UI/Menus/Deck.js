import classes from "./Deck Menus/DeckSelectMenu.module.css";

let deckClasses = "";
const Deck = (props) => {
	if (props.isClicked) {
		deckClasses = `${props.className} ${classes.clicked}`;
	} else {
		deckClasses = `${props.className}`;
	}

	const clickHandler = () => {
		props.onClick(props.deckName);
	};

	const sendDeckIdHandler = () => {
		props.getDeckId(props.id);
	};

	const deck = props.listStyle ? (
		<li onClick={sendDeckIdHandler}>{props.name}</li>
	) : (
		<div onClick={props.onClick}>
			<div onClick={clickHandler} className={deckClasses}></div>
			<label style={{ color: "white" }}>{props.deckName}</label>
		</div>
	);

	return deck;
};

export default Deck;
