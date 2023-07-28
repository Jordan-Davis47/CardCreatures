import React, { useContext, useEffect } from "react";

import useNotification from "../../../hooks/notification-hook";

import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

import AuthContext from "../../../context/auth-context";
import Button from "../Button";
import { useAxios } from "../../../hooks/axios-hook";
import classes from "./AuthForm.module.css";

const Login = (props) => {
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
		try {
			showPending({ title: "Logging in", message: "Logging user in, please wait..." });
			const response = await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/users/login`, "post", values, { "Content-type": "application/json" });
			console.log(response);
			setSubmitting(false);

			const authObj = { userId: response.data.user.id, username: response.data.user.username, token: response.data.user.token };
			auth.login(authObj);
			showSuccess({ title: "Logging in", message: "Logged in successfully!" });

			closeForm();
		} catch (err) {
			console.log(err);
			showError({ title: "Logging in", message: "Logged in failed, please try again" });
		}
	};

	return (
		<Formik
			initialValues={{
				email: "",
				password: "",
			}}
			validationSchema={Yup.object({})}
			onSubmit={(values, { setSubmitting }) => {
				submitHandler(setSubmitting, values);
			}}
		>
			{(formik) => (
				<Form className={classes.authForm}>
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
						Login
					</Button>
				</Form>
			)}
		</Formik>
	);
};

export default Login;
