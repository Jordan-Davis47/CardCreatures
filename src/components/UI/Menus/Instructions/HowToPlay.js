import { Fragment, useState } from "react";
import Objective from "./Objective";
import TypesOfCards from "./TypesOfCards";
import BattleGuide from "./BattleGuide";
import Button from "../../Button";

import classes from "./HowToPlay.module.css";

const HowToPlay = (props) => {
	const [ObjectiveActive, setObjectiveActive] = useState(false);
	const [typesOfCardsActive, setTypesOfCardsActive] = useState(false);
	const [BattleGuideActive, setBattleGuideActive] = useState(false);

	function objectiveActiveHandler() {
		setObjectiveActive(true);
		setBattleGuideActive(false);
		setTypesOfCardsActive(false);
	}
	function typesOfCardsActiveHandler() {
		setObjectiveActive(false);
		setBattleGuideActive(false);
		setTypesOfCardsActive(true);
	}
	function battleGuideActiveHandler() {
		setObjectiveActive(false);
		setBattleGuideActive(true);
		setTypesOfCardsActive(false);
	}

	function goBackHandler() {
		props.onClose();
	}

	let content;

	ObjectiveActive
		? (content = <Objective className={classes.objectiveSection} />)
		: typesOfCardsActive
		? (content = <TypesOfCards className={classes.typesOfCardsSection} />)
		: BattleGuideActive
		? (content = <BattleGuide className={classes.battleGuideSection} />)
		: (content = <Objective className={classes.objectiveSection} />);

	return (
		<Fragment>
			<div className={classes.menu}>
				<div className={classes.headers}>
					<div onClick={objectiveActiveHandler} className={classes.headerTab}>
						<p>Objective</p>
					</div>
					<div onClick={typesOfCardsActiveHandler} className={classes.headerTab}>
						<p>Types Of Cards</p>
					</div>
					<div onClick={battleGuideActiveHandler} className={classes.headerTab}>
						<p>Battle Guide</p>
					</div>
				</div>
				<div className={classes.content}>{content}</div>
			</div>
			<Button className={classes.backBtn} onClick={goBackHandler}>
				Back
			</Button>
		</Fragment>
	);
};
export default HowToPlay;
