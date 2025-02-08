import TopBar from '../../components/topbar/TopBar.tsx';
import './SummonerScreen.scss';
import BaseInfo from '../../components/summoner/baseInfo/BaseInfo.tsx';
import RankComponent from '../../components/summoner/rank/RankComponent.tsx';
import MasteryComponent from '../../components/summoner/mastery/MasteryComponent.tsx';
import { MatchComponent } from '../../components/summoner/match/MatchComponent.tsx';
import { Summoner } from '../../model/Summoner.ts';
import { useParams } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { Match } from '../../model/Match.ts';
import { LoadingSpinner } from '../../components/base/LoadingSpinner.tsx';

// TODO ensure summoner is not undefined
export const SummonerScreen = () => {
	const [summoner, setSummoner] = useState<Summoner>();
	const [loading, setLoading] = useState<boolean>(true);

	const { server, gameName, tagLine } = useParams();

	const firstRender = useRef(false); //react dev build runs twice (WTF)

	useEffect(() => {
		if (firstRender.current) {
			firstRender.current = false;
			return;
		} // Prevent second call

		firstRender.current = true;
		const fetchData = async () => {
			try {
				const response = await fetch(`/api/summoner/${server}/${gameName}/${tagLine}/update`);
				if (!response.ok) {
					throw new Error(`HTTP error! Status: ${response.status}`);
				}

				const result: Summoner = await response.json();
				console.log(`result ${result.gameName}`);
				setSummoner(result);
			} catch (err: Error) {
				console.log(err.message);
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, [server, gameName, tagLine]);

	if (loading) {
		return <LoadingSpinner/>;
	}

	return (
		<div className="summoner-screen-container">
			<TopBar />
			<div className="content">
				<div className="left-side">
					<BaseInfo {...summoner} />
					<RankComponent ranks={summoner.rank} />
					<MasteryComponent masteries={summoner.masteries} />
				</div>
				<div className="right-side">
					{summoner.matches.map((match: Match, index: number) => (
						<MatchComponent key={match.retrievedDate + index} playerName={gameName} match={match} />
					))}
				</div>
			</div>
		</div>
	);
};
