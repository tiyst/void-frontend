import TopBar from '../../components/topbar/TopBar.tsx';
import './SummonerScreen.scss';
import BaseInfo from '../../components/summoner/baseInfo/BaseInfo.tsx';
import RankComponent from '../../components/summoner/rank/RankComponent.tsx';
import { mockRanks } from '../../../mocks/RankMock.ts';
import MasteryComponent from '../../components/summoner/mastery/MasteryComponent.tsx';
import { mockMasteries } from '../../../mocks/MasteryMock.ts';
import MatchComponent from '../../components/summoner/match/MatchComponent.tsx';
import { createRandomMatch } from '../../utils/MatchUtils.ts';
import { mockMatches } from '../../../mocks/MatchMock.ts';

function SummonerScreen() {
	const urlIcon = 'https://cdn.communitydragon.org/latest/profile-icon/6759';
	const playerName = 'Team1Top';

	return (
		<div className="page-container">
			<TopBar />
			<div className="content">
				<div className="left-side">
					<BaseInfo summonerIconUrl={urlIcon} summonerName="tiyst" level="69" />
					<RankComponent ranks={mockRanks} />
					<MasteryComponent masteries={mockMasteries} />
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

export default SummonerScreen;
