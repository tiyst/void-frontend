import TopBar from '../../components/topbar/TopBar.tsx';
import './SummonerScreen.scss';
import BaseInfo from '../../components/summoner/baseInfo/BaseInfo.tsx';
import RankComponent from '../../components/summoner/rank/RankComponent.tsx';
import MasteryComponent from '../../components/summoner/mastery/MasteryComponent.tsx';
import { MatchComponent } from '../../components/summoner/match/MatchComponent.tsx';
import { Summoner } from '../../model/Summoner.ts';
import { useParams } from 'react-router';
import { Match } from '../../model/Match.ts';
import { LoadingSpinner } from '../../components/base/LoadingSpinner.tsx';
import { MissingSummonerFragment } from '../../components/summoner/missingSummoner/missingSummonerFragment.tsx';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

export const SummonerScreen = () => {
	const [countdown, setCountdown] = useState(0);
	const queryClient = useQueryClient();

	const { server = 'EUW1', gameName = 'Unknown', tagLine = 'Unknown' } = useParams();

	const fetchSummoner = async (): Promise<Summoner> => {
		const backendUrl = import.meta.env.VITE_BACKEND_URL;
		return await pullData(`${backendUrl}/api/summoner/${server}/${gameName}/${tagLine}`);
	};

	const updateSummoner = async (): Promise<Summoner> => {
		const backendUrl = import.meta.env.VITE_BACKEND_URL;
		return await pullData(`${backendUrl}/api/summoner/${server}/${gameName}/${tagLine}/update`);
	};

	const pullData = async (url: string): Promise<Summoner> => {
		const res = await fetch(url, { mode: 'cors' });
		if (!res.ok) {
			const errorData = await res.json();
			if (res.status === 400) {
				// Summoner not found
			}
			if (res.status === 425) {
				// Summoner throttling
				const receivedTime = new Date(errorData.timestamp).getTime();
				const currentTime = new Date().getTime();
				setCountdown(Math.floor((receivedTime - currentTime) / 1000) + 1);
			}

			throw new Error(errorData.message || 'An error has occurred');
		}

		return await res.json();
	};

	useEffect(() => {
		if (countdown <= 0) return;

		const timer: number = setInterval(() => {
			setCountdown((prev) => prev - 1);
		}, 1000);

		return () => clearInterval(timer);
	}, [countdown]);

	const {
		data: summoner,
		isLoading,
		isFetching
	} = useQuery<Summoner>({
		queryKey: [server, gameName, tagLine],
		queryFn: fetchSummoner,
		refetchOnWindowFocus: false,
		refetchOnReconnect: false,
		retry: false
	});

	const { mutate, isPending } = useMutation<Summoner>({
		mutationFn: updateSummoner,
		onSuccess: (newData: Summoner) => {
			queryClient.setQueryData([server, gameName, tagLine], (oldData?: Summoner) => {
				if (!oldData) return newData;

				const existingMatchIds = new Set(oldData.matches.map((m) => m.gameId));
				const mergedMatches = [
					...oldData.matches,
					...newData.matches.filter((match) => !existingMatchIds.has(match.gameId))
				];

				return {
					...newData,
					matches: mergedMatches.toSorted((a, b) => b.gameEndTimestamp - a.gameEndTimestamp)
				};
			});
		}
	});

	if (isFetching || isLoading) {
		return <LoadingSpinner />;
	}

	if (!summoner) {
		return (
			<>
				<TopBar />
				<MissingSummonerFragment gameName={gameName} tagLine={tagLine} buttonCallback={() => mutate()} />
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
							<BaseInfo
								summoner={summoner}
								buttonCallback={() => mutate()}
								countdown={countdown}
								isUpdating={isPending}
							/>
							<RankComponent ranks={summoner.rank} />
							<MasteryComponent masteries={summoner.masteries} />
						</>
					)}
				</div>
				<div className="right-side">
					{summoner?.matches
						?.toSorted((a, b) => b.gameEndTimestamp - a.gameEndTimestamp)
						.map((match: Match, index: number) => (
							<MatchComponent
								key={match.retrievedDate + index}
								match={match}
								server={server}
								gameName={summoner?.gameName ?? 'Unknown'}
							/>
						))}
				</div>
			</div>
		</div>
	);
};
