import { useState, useEffect } from "react";
import { useAxios } from "../../../hooks/axios-hook";

import LeaderboardEntry from "./LeaderboardEntry";
import Button from "../Button";
import Container from "../Layout/Container";
import LoadingSpinner from "../LoadingSpinner";

import classes from "./Leaderboard.module.css";

const getRankingsUrl = `${process.env.REACT_APP_BACKEND_URL}/users/leaderboard`;

const Leaderboard = (props) => {
	const { sendRequest, isLoading } = useAxios();
	const [leaderboardData, setLeaderboardData] = useState([]);

	useEffect(() => {
		const getLeaderboard = async () => {
			const response = await sendRequest(getRankingsUrl, "get");
			console.log(response);
			setLeaderboardData(response.data);
		};
		getLeaderboard();
	}, [sendRequest]);

	if (isLoading) {
		return <LoadingSpinner />;
	}

	return (
		<Container className={classes.leaderboardContainer}>
			<h1 className={classes.title}>Leaderboard</h1>
			<div className={classes.leaderboard}>
				<div className={classes.leaderboardHeader}>
					<p>Name:</p>
					<p>Wins:</p>
					<p>Score:</p>
				</div>

				{leaderboardData.map((ranking, index) => (
					<LeaderboardEntry className={classes.ranking} key={index} rank={index + 1} name={ranking.name} wins={ranking.wins} score={ranking.score} />
				))}
			</div>
			<Button className={classes.backBtn} onClick={props.onClose} backBtn>
				Back
			</Button>
		</Container>
	);
};

export default Leaderboard;
