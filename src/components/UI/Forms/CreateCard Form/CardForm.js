import React, { Fragment, useState, useEffect } from "react";
import OptionSelect from "./OptionSelect";
import AmountChanger from "./AmountChanger";
import Button from "../../Button";
import Card from "../../../Card";

import classes from "./CardForm.module.css";
import ImageUpload from "./ImageUpload";

const CardForm = (props) => {
	const { initialValue } = props;
	console.log(props.initialValue);

	const [cardName, setCardName] = useState(props.initialValue ? props.initialValue.name : "");
	const [cardAtk, setCardAtk] = useState(props.initialValue ? props.initialValue.atk : 0);
	const [cardDef, setCardDef] = useState(props.initialValue ? props.initialValue.def : 0);
	const [cardDescription, setCardDescription] = useState(props.initialValue ? props.initialValue.description : "");
	const [spellAmount, setSpellAmount] = useState(props.initialValue ? props.initialValue.spellAmount : 0);
	const [cardType, setCardType] = useState(props.initialValue ? props.initialValue.type : "monster");
	const [cardImg, setCardImg] = useState(props.initialValue ? props.initialValue.src : "");
	const [hasNegate, setHasNegate] = useState(false);
	const [spellType, setSpellType] = useState("heal");
	const [spellStat, setSpellStat] = useState("atk");

	const [deckPoints, setDeckPoints] = useState(0);
	const [file, setFile] = useState(null);
	const [imgIsValid, setImgIsValid] = useState(false);
	const [previewUrl, setPreviewUrl] = useState(false);
	const currentImg = props.initialValue ? props.initialValue.src : false;

	useEffect(() => {
		if (!file) {
			return;
		}
		console.log("setting preview url image");
		console.log(file);
		setPreviewUrl(window.URL.createObjectURL(file));
	}, [file]);

	function cardNameHandler(e) {
		if (e.target.value.length < 18) {
			setCardName(e.target.value);
		}
	}
	function cardAtkHandler(e) {
		setCardAtk(e.target.value);
	}
	function cardDefHandler(e) {
		setCardDef(e.target.value);
	}
	function cardDescriptionHandler(e) {
		setCardDescription(e.target.value);
	}
	function cardTypeHandler(e) {
		setCardType(e.target.textContent.toLowerCase());
	}
	function amountDecrementHandler() {
		if (spellAmount - 100 >= 0 && deckPoints - 100 >= 0) {
			setDeckPoints((prevCount) => prevCount - 100);
			setSpellAmount((prevState) => prevState - 100);
		} else {
			console.log("NOPE");
		}
	}
	function amountIncrementHandler() {
		// if (spellAmount + 100 <= 500 && deckPoints - 100 >= 0) {
		setDeckPoints((prevCount) => prevCount - 100);
		setSpellAmount((prevState) => prevState + 100);
		// } else {
		// 	console.log("NOPE");
		// }
	}
	function atkIncrementHandler() {
		// if (cardAtk + 100 <= 3000 && deckPoints - 100 >= 0) {
		setDeckPoints((prevCount) => prevCount - 100);
		setCardAtk((prevState) => prevState + 100);
		// }
	}
	function atkDecrementHandler() {
		if (cardAtk - 100 >= 0 && deckPoints - 100 >= 0 && deckPoints - 100 >= 0) {
			setDeckPoints((prevCount) => prevCount - 100);
			setCardAtk((prevState) => prevState - 100);
		} else {
			console.log("not enough");
		}
	}
	function defDecrementHandler() {
		if (cardDef - 100 >= 0 && props.deckPoints - 100 >= 0 && deckPoints - 100 >= 0) {
			setDeckPoints((prevCount) => prevCount - 100);
			setCardDef((prevState) => prevState - 100);
		} else {
			console.log("not enough");
		}
	}
	function defIncrementHandler() {
		if (cardDef + 100 <= 3000 && deckPoints - 100 >= 0) {
			setDeckPoints((prevCount) => prevCount - 100);
			setCardDef((prevState) => prevState + 100);
		} else {
			console.log("not enough");
		}
	}

	const spellTypeHandler = (e) => {
		console.log(e.target.value);
		setSpellType(e.target.value.toLowerCase());
	};

	const spellStatHandler = (e) => {
		setSpellStat(e.target.value);
		console.log(e.target.value);
	};

	const negateHandler = (e) => {
		const negate = e.target.value === "false" ? false : true;
		console.log(e.target.value);

		// if (negate && deckPoints - 500 >= 0) {
		if (negate) {
			setDeckPoints((prevState) => prevState - 500);
			setHasNegate(negate);
		} else if (!negate) {
			setDeckPoints((prevState) => prevState + 500);
			setHasNegate(false);
		}
	};

	const submitFormHandler = (e) => {
		e.preventDefault();
		console.log(card, file, currentImg);
		if (!file & currentImg) {
			props.onSubmit(card, currentImg);
		} else {
			props.onSubmit(card, file);
		}
	};

	const pickedHandler = (e) => {
		let pickedFile;
		let fileIsValid = imgIsValid;
		console.log(e.target);

		if (!currentImg || e.target.files.length === 1) {
			console.log("CHECK 2");
			if (e.target.files && e.target.files.length === 1) {
				console.log("CHECK 3");

				pickedFile = e.target.files[0];
				setFile(pickedFile);
				setImgIsValid(true);
				fileIsValid = true;
			} else {
				setImgIsValid(false);
				fileIsValid = false;
			}

			console.log(file, pickedFile);
		}
	};

	let card;

	if (cardType === "monster") {
		card = {
			name: cardName,
			atk: cardAtk,
			def: cardDef,
			description: cardDescription,
			type: cardType,
			cardId: props.card ? props.card._id : null,
			deckId: props.deckId,
		};
	} else if (cardType === "spell" || cardType === "trap") {
		card = {
			name: cardName,
			description: cardDescription,
			type: cardType,
			effect: {
				amount: spellAmount,
				stat: spellStat,
				type: spellType,
			},
			negate: hasNegate,

			cardId: props.card ? props.card._id : null,
			deckId: props.deckId,
		};
	}

	let spellBtnClasses = `${classes.cardTypeSelect}`;
	let monsterBtnClasses = `${classes.cardTypeSelect}`;
	let trapBtnClasses = `${classes.cardTypeSelect}`;

	if (cardType === "monster") {
		monsterBtnClasses = `${classes.cardTypeSelect} ${classes.active}`;
	} else if (cardType === "spell") {
		spellBtnClasses = `${classes.cardTypeSelect} ${classes.active}`;
	} else if (cardType === "trap") {
		trapBtnClasses = `${classes.cardTypeSelect} ${classes.active}`;
	}

	// const canCreate = cardName.trim() !== "" && cardDescription.trim() !== "";
	const canCreate = "name";

	console.log(currentImg, file, previewUrl);

	return (
		<Fragment>
			<form className={classes.form} onSubmit={submitFormHandler}>
				<div>
					<div className={classes.cardTypeSelectors}>
						<button className={spellBtnClasses} onClick={cardTypeHandler} type="button">
							Spell
						</button>
						<button className={monsterBtnClasses} onClick={cardTypeHandler} type="button">
							Monster
						</button>
						<button className={trapBtnClasses} onClick={cardTypeHandler} type="button">
							Trap
						</button>
					</div>
				</div>
				<div className={classes.middleContainer}>
					{(cardType === "spell" || cardType === "trap") && (
						<div className={classes.formControl}>
							<div className={classes.spellTypeContainer}>
								<OptionSelect cardType={cardType} type="spellType" onChange={spellTypeHandler} />
								{spellType === "increase" && cardType === "spell" && <OptionSelect type="increase" onChange={spellStatHandler} />}
								{cardType === "trap" && <OptionSelect type="negate" onChange={negateHandler} />}
							</div>
							<div className={classes.spellAmountContainer}>
								<AmountChanger label="Amount" htmlFor="spell" increment={amountIncrementHandler} decrement={amountDecrementHandler} amount={spellAmount} />
							</div>
						</div>
					)}
					{cardType === "monster" && (
						<div className={classes.amountChangers}>
							<AmountChanger label="Defence" htmlFor="def" increment={defIncrementHandler} decrement={defDecrementHandler} amount={cardDef} />
							<AmountChanger label="Attack" htmlFor="atk" increment={atkIncrementHandler} decrement={atkDecrementHandler} amount={cardAtk} />
						</div>
					)}
					<div className={classes.formControl}>
						<label htmlFor="name">Card Name</label>

						<input type="text" id="name" value={cardName} onChange={cardNameHandler}></input>
					</div>

					<div className={classes.formControl}>
						<label htmlFor="description">Card Description</label>
						<textarea type="text" id="description" value={cardDescription} onChange={cardDescriptionHandler}></textarea>
					</div>
					<div className={classes.formControl}>
						<label className={classes.fileInput} htmlFor="image">
							Upload Image
							<input type="file" id="image" onChange={pickedHandler} />
						</label>
						{(file || currentImg) && <p className={classes.imageText}>Image Selected</p>}
					</div>
				</div>
				<div>
					<div className={classes.createBtnContainer}>
						<Button formBtn type="submit" disabled={!canCreate}>
							{props.forEdit ? "Update Card" : "Create Card"}
						</Button>
						<Button backBtn type="button" onClick={props.onBack}>
							Back
						</Button>
					</div>
				</div>
			</form>
			<div className={classes.cardDisplaySection}>
				<Card className={classes.displayCard} name={cardName} atk={cardAtk} def={cardDef} description={cardDescription} inspect={true} src={cardImg ? cardImg : previewUrl} type="monster" />
			</div>
		</Fragment>
	);
};

export default CardForm;
