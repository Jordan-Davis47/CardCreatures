import React, { useContext, useEffect } from "react";

import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

import AuthContext from "../../../context/auth-context";
import Button from "../Button";
import { useAxios } from "../../../hooks/axios-hook";
import classes from "./AuthForm.module.css";

const Login = (props) => {
	const { sendRequest, isLoading, error } = useAxios();
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
			const response = await sendRequest("http://localhost:9000/api/users/login", "post", values, { "Content-type": "application/json" });
			console.log(response);
			setSubmitting(false);

			console.log(response.data.user.username);
			auth.login({ userId: response.data.user.id, username: response.data.user.username, token: response.data.user.token });
			console.log(auth.isLoggedIn);
			closeForm();
		} catch (err) {
			console.log(err, "errrrrorr");
			//error handling in request function//
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
						<Field className={classes.input} name="password" type="text" />
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