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

export const SummonerScreen = () => {
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
			if (res.status === 400) { // Summoner not found
			}
			if (res.status === 425) { // Summoner throttling
			}

			throw new Error(errorData.message || 'An error has occurred');
		}

		return await res.json();
	};

	const { data: summoner, isLoading, isFetching } = useQuery<Summoner>({
		queryKey: [server, gameName, tagLine],
		queryFn: fetchSummoner,
		refetchOnWindowFocus: false,
		refetchOnReconnect: false,
		retry: false,
	});

	const { mutate } = useMutation<Summoner>({
		mutationFn: updateSummoner,
		onSuccess: (newData: Summoner) => {
			queryClient.setQueryData([server, gameName, tagLine], newData);
		}
	});

	if (isFetching || isLoading) {
		return <LoadingSpinner />;
	}

	if (!summoner) {
		return (
			<>
				<TopBar />
				<MissingSummonerFragment gameName={gameName}
										 tagLine={tagLine}
										 buttonCallback={() => mutate()}
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
							<BaseInfo summoner={summoner} buttonCallback={() => mutate()} />
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
