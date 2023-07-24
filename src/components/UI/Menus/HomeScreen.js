import { useContext, useState } from "react";

import AuthContext from "../../../context/auth-context";

import classes from "./HomeScreen.module.css";
import DuelMenu from "./Duel Menus/DuelMenu";
import DecksMenu from "./Deck Menus/DecksMenu";
import HowToPlay from "./Instructions/HowToPlay";
import Leaderboard from "./Leaderboard";
import Auth from "../../User/Auth";
import MainMenu from "./MainMenu";
import ComingSoon from "./ComingSoon";
import Features from "./Features";

const HomeScreen = (props) => {
	const auth = useContext(AuthContext);
	const [openDuelMenu, setOpenDuelMenu] = useState(false);
	const [howToPlayIsOpen, setHowToPlayIsOpen] = useState(false);
	const [leaderboardIsOpen, setLeaderboardIsOpen] = useState(false);
	const [authOpen, setAuthOpen] = useState(false);
	const [DecksMenuIsOpen, setDecksMenuIsOpen] = useState(false);
	const [comingSoonIsOpen, setComingSoonIsOpen] = useState(false);
	const [featuresIsOpen, setFeaturesIsOpen] = useState(false);

	const openDuelMenuHandler = () => {
		setOpenDuelMenu(true);
	};
	const closeDuelMenuHandler = () => {
		setOpenDuelMenu(false);
	};

	const openHowToPlayHandler = () => {
		setHowToPlayIsOpen(true);
	};

	const closeHowToPlayHandler = () => {
		setHowToPlayIsOpen(false);
	};

	const openLeaderboardHandler = () => {
		setLeaderboardIsOpen(true);
	};

	const closeLeaderboardHandler = () => {
		setLeaderboardIsOpen(false);
	};

	const closeAuthHandler = () => {
		props.closeAuth();
	};

	const openDecksMenuHandler = () => {
		setDecksMenuIsOpen(true);
	};

	const closeDeckMenuHandler = () => {
		setDecksMenuIsOpen(false);
	};

	const openComingSoonHandler = () => {
		setComingSoonIsOpen(true);
	};

	const closeComingSoonHandler = () => {
		setComingSoonIsOpen(false);
	};

	const openFeaturesHandler = () => {
		setFeaturesIsOpen(true);
	};

	const closeFeaturesHandler = () => {
		setFeaturesIsOpen(false);
	};

	const mainMenuIsOpen = !openDuelMenu && !props.showAuth && !howToPlayIsOpen && !leaderboardIsOpen && !DecksMenuIsOpen && !comingSoonIsOpen && !featuresIsOpen;

	return (
		<div className={classes.mainMenuBackdrop}>
			{mainMenuIsOpen && (
				<MainMenu nextMenu={openDuelMenuHandler} openHowToPlay={openHowToPlayHandler} openLeaderboard={openLeaderboardHandler} openDecksMenu={openDecksMenuHandler} openFeatures={openFeaturesHandler} openComingSoon={openComingSoonHandler} />
			)}
			{openDuelMenu && !props.showAuth && <DuelMenu onClose={closeDuelMenuHandler} onPickDeck={props.onPickDeck} />}
			{!openDuelMenu && !props.showAuth && !howToPlayIsOpen && !leaderboardIsOpen && DecksMenuIsOpen && <DecksMenu back={closeDeckMenuHandler} />}
			{howToPlayIsOpen && !props.showAuth && <HowToPlay onClose={closeHowToPlayHandler} />}
			{leaderboardIsOpen && !props.showAuth && <Leaderboard onClose={closeLeaderboardHandler} />}
			{comingSoonIsOpen && !props.showAuth && <ComingSoon onBack={closeComingSoonHandler} />}
			{featuresIsOpen && !props.showAuth && <Features onBack={closeFeaturesHandler} />}
			{props.showAuth && !auth.isLoggedIn && <Auth closeForm={closeAuthHandler} />}
		</div>
	);
};

export default HomeScreen;
