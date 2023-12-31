import { Fragment, useState, useContext, useEffect } from "react";

import useNotification from "../../../hooks/notification-hook";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

import classes from "./AuthForm.module.css";
import Button from "../Button";
import { useAxios } from "../../../hooks/axios-hook";
import AuthContext from "../../../context/auth-context";

const SignUp = (props) => {
	const { sendRequest, isLoading, error } = useAxios();
	const { showError, showPending, showSuccess } = useNotification();
	const auth = useContext(AuthContext);
	const isLoggedIn = auth.isLoggedIn;

	const { closeForm } = props;
	useEffect(() => {
		if (isLoggedIn) {
			closeForm();
		}
	}, [isLoggedIn, closeForm]);

	const submitHandler = async (setSubmitting, values) => {
		showPending({ title: "Signing up", message: "Creating new user, please wait..." });
		try {
			const response = await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/users/signup`, "post", values, { "Content-type": "application/json" });
			setSubmitting(false);
			console.log(response);
			auth.login({ userId: response.data.user.id, username: response.data.user.username, token: response.data.user.token });
			showSuccess({ title: "Signing up", message: "Successfully created new user!" });
			closeForm();
		} catch (err) {
			showError({ title: "Signing up", message: "Creating new user failed, please try again" });
		}
	};

	return (
		<Formik
			initialValues={{
				email: "",
				username: "",
				password: "",
			}}
			validationSchema={Yup.object({
				email: Yup.string().email("Invalid email address").required("Required"),
				username: Yup.string().max(15, "Must be 15 characters or less").required("Required"),
				password: Yup.string().min(6, "Must be at least 6 characters").required("Required"),
			})}
			onSubmit={(values, { setSubmitting }) => {
				submitHandler(setSubmitting, values);
			}}
		>
			{(formik) => (
				<Form className={classes.authForm}>
					<div className={classes.formControl}>
						<Field className={classes.input} name="username" type="text" />
						<label htmlFor="username">Username</label>
						<ErrorMessage name="username" />
					</div>

					<div className={classes.formControl}>
						<Field name="email" type="text" />
						<label htmlFor="email">Email</label>
						<ErrorMessage name="email" />
					</div>
					<div className={classes.formControl}>
						<Field className={classes.input} name="password" type="password" />
						<label htmlFor="password">Password</label>
						<ErrorMessage name="password" />
					</div>
					<Button formBtn type="submit" disabled={!(formik.isValid && formik.dirty)}>
						Create Account
					</Button>
				</Form>
			)}
		</Formik>
	);
};

export default SignUp;
