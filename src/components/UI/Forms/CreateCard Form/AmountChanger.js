import React from "react";

import classes from "./AmountChanger.module.css";

const AmountChanger = (props) => {
	return (
		<div className={classes.statChange}>
			<div>
				<label htmlFor={props.htmlFor}>{props.label}</label>
			</div>
			<div>
				<button onClick={props.decrement} type="button">
					-
				</button>
				<span className={classes.amountCounter}>{props.amount}</span>
				<button onClick={props.increment} type="button">
					+
				</button>
			</div>
		</div>
	);
};

export default AmountChanger;
