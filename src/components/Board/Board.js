import React, { useEffect, useState } from "react";
import { ReactComponent as CrossSwordsIcon } from "../../Images/Icons/crossSwords.svg";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useBoard from "../../hooks/board-hook";

import { faBars } from "@fortawesome/free-solid-svg-icons";
import BattleLog from "../UI/BattleLog";

import styles from "../UI/Animations.module.css";
import classes from "./Board.module.css";

import CardSlot from "./CardSlot";
import TributeDisplay from "../UI/TributeDisplay";
import TrapCardsDisplay from "../UI/TrapCardsDisplay";
import Button from "../UI/Button";
import Hand from "../Hand/Hand";

import { CSSTransition, TransitionGroup } from "react-transition-group";
import Tooltips from "./Tooltips";
import HourglassIcon from "../../icons/HourglassIcon";

const Board = (props) => {
	const state = useSelector((state) => state.player);
	const { battleSelectHandler, tributeSelectHandler, selectHandlers, cancelTribute, endTurnHandler, openTrap, closeTrapCardDisplay } = useBoard();
	const [showWinner, setShowWinner] = useState(false);
	const [showBattleLog, setShowBattleLog] = useState(false);

	const checkForDirectAttackOnP1 = state.gamePhases.turn !== 1 && state.gamePhases.battlePhase && !state.player1.fieldSlots.fs1.isPlaying && !state.player1.fieldSlots.fs2.isPlaying && !state.player1.fieldSlots.fs3.isPlaying && !state.player1.isTurn;

	const checkForDirectAttackOnP2 = state.gamePhases.turn !== 1 && state.gamePhases.battlePhase && !state.player2.fieldSlots.fs1.isPlaying && !state.player2.fieldSlots.fs2.isPlaying && !state.player2.fieldSlots.fs3.isPlaying && !state.player2.isTurn;

	let deck1Classes = classes.deck;
	let deck2Classes = classes.deck2;
	if (state.gamePhases.drawPhase) {
		if (state.player1.isTurn) {
			deck1Classes = `${classes.deck} ${classes.highlightDeck}`;
		} else if (state.player2.isTurn && !state.aiPlaying) {
			deck2Classes = `${classes.deck2} ${classes.highlightDeck}`;
		}
	}

	return (
		<div className={classes.board}>
			{!showBattleLog && <Tooltips />}
			<Button
				className={classes.battleLogBtn}
				onClick={() => {
					setShowBattleLog((prevState) => !prevState);
				}}
			>
				Battle Log
			</Button>
			{showBattleLog && <BattleLog />}
			<div>
				{checkForDirectAttackOnP2 && (
					<button className={classes.directAttackP2Btn} onClick={battleSelectHandler}>
						Direct Attack on P2
					</button>
				)}

				{checkForDirectAttackOnP1 && (
					<button className={classes.directAttackP1Btn} onClick={battleSelectHandler}>
						Direct Attack on P1
					</button>
				)}
			</div>
			<Hand id={"p1"} hand={state.player1.hand} />
			<Hand id={"p2"} hand={state.player2.hand} />
			<div className={classes.p1Life}>{state.player1.lifePoints}</div>
			<div className={classes.p2Life}>{state.player2.lifePoints}</div>
			<div className={classes.cardSlotContainer}>
				<CardSlot fieldSlot getCardInfo={selectHandlers} id={"p1s1"} className={classes.cardSlot} card={state.player1.fieldSlots.fs1} isPlaying={state.player1.fieldSlots.fs1.isPlaying} />
				<CardSlot fieldSlot getCardInfo={selectHandlers} id={"p1s2"} className={classes.cardSlot} card={state.player1.fieldSlots.fs2} isPlaying={state.player1.fieldSlots.fs2.isPlaying} />
				<CardSlot fieldSlot getCardInfo={selectHandlers} id={"p1s3"} className={classes.cardSlot} card={state.player1.fieldSlots.fs3} isPlaying={state.player1.fieldSlots.fs3.isPlaying} />
			</div>
			<div className={classes.cardSlot2Container}>
				<CardSlot fieldSlot getCardInfo={selectHandlers} id={"p2s1"} className={classes.cardSlot} card={state.player2.fieldSlots.fs1} isPlaying={state.player2.fieldSlots.fs1.isPlaying} />
				<CardSlot fieldSlot getCardInfo={selectHandlers} id={"p2s2"} className={classes.cardSlot} card={state.player2.fieldSlots.fs2} isPlaying={state.player2.fieldSlots.fs2.isPlaying} />
				<CardSlot fieldSlot getCardInfo={selectHandlers} id={"p2s3"} className={classes.cardSlot} card={state.player2.fieldSlots.fs3} isPlaying={state.player2.fieldSlots.fs3.isPlaying} />
			</div>
			<div className={classes.p1BottomContainer}>
				<CardSlot className={classes.graveyard2} id={"p1fs1"} card={state.player1.fieldSpell} isPlaying={state.player1.fieldSpell.isPlaying} />
				<CardSlot className={classes.spellSlot} card={state.player1.trapSlots.ts1} getCardInfo={selectHandlers} isPlaying={state.player1.trapSlots.ts1.isPlaying} />
				<CardSlot className={classes.spellSlot} card={state.player1.trapSlots.ts2} getCardInfo={selectHandlers} isPlaying={state.player1.trapSlots.ts2.isPlaying} />
				<CardSlot className={classes.spellSlot} card={state.player1.trapSlots.ts3} getCardInfo={selectHandlers} isPlaying={state.player1.trapSlots.ts3.isPlaying} />
				<CardSlot onClick={props.onDrawCard} className={deck1Classes}>
					{props.p1Deck.length}
				</CardSlot>
			</div>
			<div className={classes.p2BottomContainer}>
				<CardSlot className={classes.graveyard} id={"p2fs1"} card={state.player2.fieldSpell} isPlaying={state.player2.fieldSpell.isPlaying} />
				<CardSlot className={classes.spellSlot} card={state.player2.trapSlots.ts1} getCardInfo={selectHandlers} isPlaying={state.player2.trapSlots.ts1.isPlaying} />
				<CardSlot className={classes.spellSlot} card={state.player2.trapSlots.ts2} getCardInfo={selectHandlers} isPlaying={state.player2.trapSlots.ts2.isPlaying} />
				<CardSlot className={classes.spellSlot} card={state.player2.trapSlots.ts3} getCardInfo={selectHandlers} isPlaying={state.player2.trapSlots.ts3.isPlaying} />
				<CardSlot onClick={props.onDrawCard} className={deck2Classes}>
					{props.p2Deck.length}
				</CardSlot>
			</div>

			<div onClick={props.onBattlePhase} className={classes.battlePhaseContainer}>
				{state.gamePhases.turn !== 1 && state.gamePhases && <CrossSwordsIcon className={classes.battlePhaseIcon} />}
				{state.gamePhases.turn !== 1 && state.gamePhases && <p>Battle Phase</p>}
			</div>

			<div onClick={endTurnHandler} className={classes.endTurnContainer}>
				<HourglassIcon className={classes.endTurn} />
				<p>End Turn</p>
			</div>
			<div className={classes.inGameMenuContainer}>
				<FontAwesomeIcon className={classes.inGameMenuIcon} icon={faBars} onClick={props.onOpenInGameMenu} />
			</div>
			{state.tributePrompt && <TributeDisplay onTributeSelect={tributeSelectHandler} onCancel={cancelTribute} selectedCard={state.selectedCard} cardOwner={state.selectedCard.owner} tributes={state.tributes} />}
			{openTrap && <TrapCardsDisplay p1TrapCards={state.player1.trapSlots} p2TrapCards={state.player2.trapSlots} p1Turn={props.p1Turn} p2Turn={props.p2Turn} onClose={closeTrapCardDisplay} AiPlaying={props.AiPlaying} />}
		</div>
	);
};

export default Board;
