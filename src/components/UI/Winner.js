import React, { useState, useEffect, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import { playerActions } from "../../store/index";

import { useAxios } from "../../hooks/axios-hook";
import AuthContext from "../../context/auth-context";
import Modal from "./Modal";
import classes from "./Winner.module.css";
import Button from "./Button";

const Winner = (props) => {
	const dispatch = useDispatch();
	const auth = useContext(AuthContext);
	const { sendRequest, isLoading } = useAxios();
	const state = useSelector((state) => state.player);
	const player1 = useSelector((state) => state.player.player1);
	const player2 = useSelector((state) => state.player.player2);
	const [winName, setWinName] = useState("");
	const [winner, setWinner] = useState(false);
	const [isWin, setIsWin] = useState(null);

	const aiNames = ["The Duel Master", "Kid Joey", "Oh-Gi-Yu", "Cloud", "Joel Miller", "Ellie Williams"];
	const randAiName = aiNames[Math.floor(Math.random() * aiNames.length)];

	useEffect(() => {
		const sendStats = async (isWin) => {
			const response = await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/users/updateStats`, "post", { uid: auth.userId, win: isWin, token: auth.token });
			console.log(response);
			return response;
		};
		if (player1.lifePoints <= 0 && !winner) {
			console.log("setting winner");
			const winner = { ...player2 };
			setWinner(winner);
			setIsWin(false);
			if (state.AiPlaying) {
				setWinName(randAiName);
				if (auth.isLoggedIn) {
					const response = sendStats(false);
					console.log(response);
				}
			} else {
				setWinName("Player 2");
			}
		} else if (player2.lifePoints <= 0 && !winner) {
			console.log("setting winner");
			const winner = { ...player1 };
			setWinner(winner);
			setIsWin(true);
			console.log(winner);
			if (auth.isLoggedIn) {
				setWinName(auth.username);
				const response = sendStats(true);
				console.log(response);
			} else {
				setWinName("Player 1");
			}
		}
	}, [player1, player2, randAiName, state.AiPlaying, winner, sendRequest, auth]);

	const exitGame = () => {
		console.log(props);
		props.exitGame();
	};

	console.log(winName);
	console.log(auth.isLoggedIn, "islogged in");

	return (
		<Modal>
			{winner && (
				<div className={classes.container}>
					<h1 className={classes.title}>{winName} wins</h1>
					<h3>A Hard Fought Victory!</h3>
					<div>
						<h4>Your Match Stats:</h4>
						<ul>
							<li>Damage Dealt: {winner.stats.damageDealt}</li>
							<li>Damage Taken: {winner.stats.damageTaken} </li>
							<li>Damage Healed: {winner.stats.damageHealed} </li>
							<li>Total Cards Played: {winner.stats.cardsUsed} </li>
						</ul>
					</div>
					<Button backBtn onClick={exitGame}>
						Exit
					</Button>
				</div>
			)}
		</Modal>
	);
};

export default Winner;
