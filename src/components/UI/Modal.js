import { Fragment } from "react";
import ReactDOM from "react-dom";
import classes from "./Modal.module.css";

const Backdrop = (props) => {
	return <div className={classes.backdrop} onClick={props.onClose}></div>;
};

const ModalOverlay = (props) => {
	let modalClass;
	// props.className === "trapPrompt" ? (modalClass = `${classes.trapPrompt}`) ? props.className === 'responsePrompt'  modalClass = `${classes.responseModal}` : (modalClass = `${classes.modal}`);

	if (props.className === "trapPrompt") {
		modalClass = `${classes.trapPrompt}`;
	} else {
		modalClass = `${classes.modal} ${props.className}`;
	}

	return (
		<Fragment>
			<div className={`${modalClass} ${props.border ? classes.modalBorder : ""}`} style={props.style}>
				<header className={classes.header}>
					<h2>{props.headerContent}</h2>
				</header>
				<div className={classes.modalContent}>{props.children}</div>
			</div>
		</Fragment>
	);
};

const portalElement = document.getElementById("overlay");

const Modal = (props) => {
	return (
		<Fragment>
			{ReactDOM.createPortal(<Backdrop onClose={props.onClose} />, portalElement)}
			{ReactDOM.createPortal(
				<ModalOverlay {...props} className={props.className}>
					{props.children}
				</ModalOverlay>,
				portalElement
			)}
		</Fragment>
	);
};

export default Modal;
