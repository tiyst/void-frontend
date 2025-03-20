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
import { UpdateSummonerSpinner } from './UpdateSummonerSpinner.tsx';

export const SummonerScreen = () => {
	const [countdown, setCountdown] = useState(0);
	const [moreMatchesAvailable, setMoreMatchesAvailable] = useState(true);
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

	useEffect(() => {
		if (summoner) {
			document.title = `${summoner.gameName}#${summoner.tagLine} - Void`;
		}
	}, [summoner]);

	const {
		data: additionalMatches = [],
		isLoading: matchesLoading,
		isFetching: matchesFetching,
		refetch: getMoreMatches
	} = useQuery<Match[]>({
		queryKey: ['moreMatches', server, gameName, tagLine, summoner?.matches.length ?? 0],
		refetchOnWindowFocus: false,
		refetchOnReconnect: false,
		retry: false,
		queryFn: async (): Promise<Match[]> => {
			if (!summoner) return [];
			const backendUrl = import.meta.env.VITE_BACKEND_URL;
			const url = `${backendUrl}/api/match/${summoner.puuid}?matchesSize=${summoner.matches.length}`;
			const result = await fetch(url, { mode: 'cors' });
			const matches = await result.json();
			if (!matches || (matches && matches.length === 0)) {
				setMoreMatchesAvailable(false);
			}
			return matches;
		},
		enabled: false
	});

	useEffect(() => {
		if (!additionalMatches) return;

		queryClient.setQueryData([server, gameName, tagLine], (oldData?: Summoner) => {
			if (!oldData) return;

			const existingMatchIds = new Set(oldData.matches.map((match) => match.gameId));
			const mergedMatches = [
				...oldData.matches,
				...additionalMatches.filter((match) => !existingMatchIds.has(match.gameId))
			];
			return {
				...oldData,
				matches: mergedMatches.toSorted((a, b) => b.gameEndTimestamp - a.gameEndTimestamp)
			};
		});
	}, [additionalMatches]);

	const fetchMoreMatches = () => {
		getMoreMatches();
	};

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
				<MissingSummonerFragment
					gameName={gameName}
					tagLine={tagLine}
					buttonCallback={() => mutate()}
					isUpdating={isPending}
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
					{summoner?.matches?.length === 0 ? (
						<div className="base">
							<h2>No matches found, please update.</h2>
						</div>
					) : (
						<>
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
							<button
								className="load-matches-button"
								onClick={fetchMoreMatches}
								disabled={!moreMatchesAvailable}
							>
								{matchesLoading || matchesFetching ? (
									<UpdateSummonerSpinner />
								) : (
									<h2>{moreMatchesAvailable ? 'Get more matches' : 'No more matches'}</h2>
								)}
							</button>
						</>
					)}
				</div>
			</div>
		</div>
	);
};
