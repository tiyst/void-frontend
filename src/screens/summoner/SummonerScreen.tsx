import TopBar from '../../components/topbar/TopBar.tsx';
import './SummonerScreen.scss';
import BaseInfo from '../../components/summoner/baseInfo/BaseInfo.tsx';
import RankComponent from '../../components/summoner/rank/RankComponent.tsx';
import MasteryComponent from '../../components/summoner/mastery/MasteryComponent.tsx';
import { MatchComponent } from '../../components/summoner/match/MatchComponent.tsx';
import { mockMatches } from '../../../mocks/MatchMock.ts';
import { createRandomMatch } from '../../utils/MockUtils.ts';
import { Summoner } from '../../model/Summoner.ts';

type SummonerScreenProps = {
	summoner: Summoner;
};

export const SummonerScreen= (data: SummonerScreenProps) => {
	const playerName = 'Team1Top';

	return (
		<div className="page-container">
			<TopBar />
			<div className="content">
				<div className="left-side">
					<BaseInfo {...data.summoner} />
					<RankComponent ranks={data.summoner.rank} />
					<MasteryComponent masteries={data.summoner.masteries} />
				</div>
				<div className="right-side">
					<MatchComponent playerName={playerName} match={mockMatches} />
					<MatchComponent playerName={playerName} match={createRandomMatch()} />
					<MatchComponent playerName={playerName} match={createRandomMatch()} />
					<MatchComponent playerName={playerName} match={createRandomMatch()} />
				</div>
			</div>
		</div>
	);
}
