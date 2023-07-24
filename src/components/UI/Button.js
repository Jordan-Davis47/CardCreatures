import classes from "./Button.module.css";

const Button = (props) => {
	let buttonClass;

	if (props.menuBtn) {
		buttonClass = classes.button;
	} else if (props.formBtn) {
		buttonClass = `${classes.formBtn}`;
	} else if (props.menuButton) {
		buttonClass = classes.menuButton;
	} else if (props.backBtn) {
		buttonClass = classes.backBtn;
	} else {
		buttonClass = `${props.className}`;
	}

	return (
		<button className={`${buttonClass} ${props.className}`} type={props.type} onClick={props.onClick} disabled={props.disabled}>
			{props.children}
		</button>
	);
};

export default Button;
