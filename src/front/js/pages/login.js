import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import LogIn from "../component/loginForm";

import { Context } from "../store/appContext";

export const Login = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="container">
			<LogIn/>
		</div>
	);
};
