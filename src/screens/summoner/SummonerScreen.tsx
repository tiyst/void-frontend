import TopBar from '../../components/topbar/TopBar.tsx';
import './SummonerScreen.scss';
import BaseInfo from '../../components/summoner/baseInfo/BaseInfo.tsx';
import RankComponent from '../../components/summoner/rank/RankComponent.tsx';
import MasteryComponent from '../../components/summoner/mastery/MasteryComponent.tsx';
import { MatchComponent } from '../../components/summoner/match/MatchComponent.tsx';
import { Summoner } from '../../model/Summoner.ts';
import { useParams } from 'react-router';
import { useEffect, useRef, useState } from 'react';
import { Match } from '../../model/Match.ts';
import { LoadingSpinner } from '../../components/base/LoadingSpinner.tsx';
import { MissingSummonerFragment } from '../../components/summoner/missingSummoner/missingSummonerFragment.tsx';

export const SummonerScreen = () => {
	const [summoner, setSummoner] = useState<Summoner>();
	const [loading, setLoading] = useState<boolean>(true);
	const [nonExistingSummoner, setNonExistingSummoner] = useState<boolean>(false);

	const { server = 'EUW1', gameName = 'Unknown', tagLine = 'Unknown' } = useParams();

	const firstRender = useRef(false); //react dev build runs twice (WTF)

	const fetchNewData = async () => {
		const backendUrl = import.meta.env.VITE_BACKEND_URL;
		await pullData(`${backendUrl}/api/summoner/${server}/${gameName}/${tagLine}/update`);
		setNonExistingSummoner(false);
	};

	const fetchData = async () => {
		const backendUrl = import.meta.env.VITE_BACKEND_URL;
		await pullData(`${backendUrl}/api/summoner/${server}/${gameName}/${tagLine}`);
	};

	// TODO useQuery / reactQuery
	const pullData = async (url: string) => {
		fetch(`${url}`, { mode: 'cors' })
		.then(async res => {
			if (!res.ok) {
				const errorData = await res.json();
				if (res.status === 400) {
					setNonExistingSummoner(true);
				}
				if (res.status === 425) {
					//Summoner throttling
					// TODO add button disable + change inside to timer
					console.log(`error data ${errorData.message}`);
				}
				throw new Error(errorData.message);
			}

			const result: Summoner = await res.json();
			setSummoner(result);
		})
		.catch(error => {
			console.error(error);
		})
		.finally(() => setLoading(false));
	};

	useEffect(() => {
		console.log(import.meta.env.MODE);
		if (import.meta.env.MODE === 'development') {
			if (firstRender.current) {
				firstRender.current = false;
				return;
			} // Prevent second call

			firstRender.current = true;
		}

		fetchData();
	}, [server, gameName, tagLine]);

	if (loading) {
		return <LoadingSpinner />;
	}

	if (nonExistingSummoner) {
		return (
			<>
				<TopBar />
				<MissingSummonerFragment summonerIconId={29}
										 gameName={gameName}
										 tagLine={tagLine}
										 buttonCallback={() => fetchNewData()}
				/>
			</>
		);
	}

	return (
		<div className="summoner-screen-container">
			<TopBar />
			<div className="content">
				<div className="left-side">
					{summoner && (
						<>
							<BaseInfo summoner={summoner} buttonCallback={() => fetchNewData()} />
							<RankComponent ranks={summoner.rank} />
							<MasteryComponent masteries={summoner.masteries} />
						</>
					)}
				</div>
				<div className="right-side">
					{summoner?.matches.map((match: Match, index: number) => (
						<MatchComponent key={match.retrievedDate + index}
										match={match}
										server={server}
										gameName={summoner?.gameName ?? 'Unknown'} />
					))}
				</div>
			</div>
		</div>
	);
};
