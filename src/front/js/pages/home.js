import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/login.css";
import SingUp from "../component/singup.js"

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="row">
			<div className="col text-center mt-5">
					<SingUp/>
				</div>
    	</div>
		
	);
};
