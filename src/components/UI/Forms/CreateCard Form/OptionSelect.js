import React, { Fragment } from "react";

import classes from "./OptionSelect.module.css";

const OptionSelect = (props) => {
	const { type } = props;

	if (type === "increase") {
		return (
			<div className={classes.formControl}>
				<label htmlFor="increase">Stat</label>
				<select id="increase" onChange={props.onChange}>
					<option value="atk">Atk</option>
					<option value="def">Def</option>
				</select>
			</div>
		);
	}

	if (type === "negate") {
		return (
			<div className={classes.formControl}>
				<label htmlFor="negate">Negate Attack</label>
				<select id="negate" onChange={props.onChange}>
					<option value={false}>False</option>
					<option value={true}>True</option>
				</select>
			</div>
		);
	}

	if (type === "spellType") {
		return (
			<div className={classes.formControl}>
				<label htmlFor="spellType">Spell Type</label>
				<select id="spellType" onChange={props.onChange}>
					<option value="heal">Heal</option>
					<option value="damage">Damage</option>
					{props.cardType === "spell" && <option value="increase">Increase</option>}
				</select>
			</div>
		);
	}
};

export default OptionSelect;
