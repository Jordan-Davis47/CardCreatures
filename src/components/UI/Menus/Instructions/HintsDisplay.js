import React, { useState, useCallback, useEffect } from "react";

import Button from "../../Button";
import classes from "./HintsDisplay.module.css";

const hints = [
	"Use trap cards to turn the tides of a tough match",
	"Sometimes its a good idea to save magic cards until the right moment!",
	"Tributing a monster to summon a stronger one is never a bad idea... mostly",
	"Play to your monsters strengths! if they have a high defence stat dont be afraid to hold the line!",
];
const hintsMaxNumber = hints.length - 1;

const HintsDisplay = () => {
	const [currentFrame, setCurrentFrame] = useState(0);
	const [currentHint, setCurrentHint] = useState(hints[currentFrame]);

	useEffect(() => {
		const changeFrame = () => {
			let frame;
			if (currentFrame === hintsMaxNumber) {
				frame = 0;
			} else {
				frame = currentFrame + 1;
			}
			setCurrentFrame(frame);
			setCurrentHint(hints[frame]);
		};

		const interval = setInterval(changeFrame, 5000);

		return () => clearInterval(interval);
	}, [currentFrame]);

	return (
		<div className={classes.container}>
			<div className={classes.hintContainer}>
				<p>{currentHint}</p>
			</div>
			<div className={classes.navBar}>
				<Button>L</Button>
				<span className={classes.navCircle}></span>
				<span className={classes.navCircle}></span>
				<span className={classes.navCircle}></span>
				<span className={classes.navCircle}></span>
				<span className={classes.navCircle}></span>
				<span className={classes.navCircle}></span>
				<Button>R</Button>
			</div>
		</div>
	);
};

export default HintsDisplay;
