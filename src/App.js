import { useState, Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { playerActions } from "./store/index";

import Button from "./components/UI/Button";
import Board from "./components/Board/Board";
import btnClasses from "./components/UI/Button.module.css";
import Winner from "./components/UI/Winner";
import InGameMenu from "./components/UI/InGameMenu";
import HomeScreen from "./components/UI/Menus/HomeScreen";

import Layout from "./components/UI/Layout/Layout";
import { NotificationContextProvider } from "./context/notification-context";

function App() {
	const dispatch = useDispatch();
	const state = useSelector((state) => state.player);
	const [showHomePage, setshowHomePage] = useState(true);
	const [inGameMenuOpen, setInGameMenuOpen] = useState(false);
	const [trapMenuIsOpen, setTrapMenuIsOpen] = useState(false);
	const [drawCardsIsShown, setDrawCardsIsShown] = useState(false);
	const AiPlaying = useSelector((state) => state.player.AiPlaying);
	const [showBoard, setShowBoard] = useState(false);
	const [showWinner, setShowWinner] = useState(false);
	const [showAuth, setShowAuth] = useState(false);

	const closeWinnerHandler = () => {
		setShowWinner(false);
	};

	function pickDeckHandler() {
		setShowBoard(true);
		setDrawCardsIsShown(true);
		setshowHomePage(false);
	}

	//draw 4 card hand from deck//
	function PlayerDrawHandHandler() {
		dispatch(playerActions.playersDrawHand());
		dispatch(playerActions.setPlayerTurn("state.player1"));
		setDrawCardsIsShown(false);
	}

	function endTurnHandler() {
		dispatch(playerActions.endTurn());

		if (inGameMenuOpen) {
			setInGameMenuOpen(false);
		}
	}

	function drawCardHandler() {
		dispatch(playerActions.drawCard());
	}

	function battlePhaseHandler() {
		console.log("battle check");
		dispatch(playerActions.setBattlephase(true));
		dispatch(playerActions.setSummonPhase(false));
		dispatch(playerActions.setIsTributing(false));
		dispatch(playerActions.setTributesToFalse());

		if (inGameMenuOpen) {
			setInGameMenuOpen(false);
		}
	}

	function openInGameMenu() {
		setInGameMenuOpen(true);
	}

	function closeInGameMenu() {
		setInGameMenuOpen(false);
	}

	function trapPromptCloseHandler() {
		setTrapMenuIsOpen(false);
		console.log("trap menu set to false");
	}

	useEffect(() => {
		if ((state.player1.lifePoints <= 0 || state.player2.lifePoints <= 0) && state.gamePhases.turn >= 1) {
			setShowWinner(true);
		}
	}, [state.player1.lifePoints, state.player2.lifePoints, state.gamePhases.turn]);

	const exitGame = () => {
		setShowBoard(false);
		setShowWinner(false);
		setshowHomePage(true);
		dispatch(playerActions.exitGame());
		setInGameMenuOpen(false);
	};

	const showAuthHandler = () => {
		setShowAuth(true);
	};

	const closeAuthHandler = () => {
		setShowAuth(false);
	};

	return (
		<NotificationContextProvider>
			<Layout showHeader={!showBoard} showAuth={showAuthHandler}>
				{showHomePage && <HomeScreen showAuth={showAuth} closeAuth={closeAuthHandler} onPickDeck={pickDeckHandler} />}
				{showWinner && <Winner exitGame={exitGame} close={closeWinnerHandler} />}
				{showBoard && (
					<Board
						onDrawCard={drawCardHandler}
						onBattlePhase={battlePhaseHandler}
						p1Deck={state.player1.deck}
						p2Deck={state.player2.deck}
						onEndTurn={endTurnHandler}
						onOpenInGameMenu={openInGameMenu}
						onCloseTrapPrompt={trapPromptCloseHandler}
						trapPrompt={trapMenuIsOpen}
						AiPlaying={AiPlaying}
					/>
				)}

				{drawCardsIsShown && (
					<Button className={btnClasses.drawButton} onClick={PlayerDrawHandHandler}>
						Draw Cards
					</Button>
				)}
				{inGameMenuOpen && (
					<InGameMenu
						onBattlePhase={battlePhaseHandler}
						onEndTurn={endTurnHandler}
						onCloseMenu={closeInGameMenu}
						onQuitGame={exitGame}
						battlePhase={state.gamePhases.battlePhase}
						drawPhase={state.gamePhases.drawPhase}
						summonPhase={state.gamePhases.summonPhase}
						turn={state.gamePhases.turn}
					/>
				)}
			</Layout>
		</NotificationContextProvider>
	);
}

export default App;
