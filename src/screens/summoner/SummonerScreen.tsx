import TopBar from '../../components/topbar/TopBar.tsx';
import './SummonerScreen.scss';
import Base from '../../components/base/Base.tsx';
import BaseInfo from '../../components/summoner/baseInfo/BaseInfo.tsx';
import RankComponent from '../../components/summoner/rank/RankComponent.tsx';
import { mockRanks } from '../../../mocks/RankMock.ts';
import MasteryComponent from '../../components/summoner/mastery/MasteryComponent.tsx';
import { mockMasteries } from '../../../mocks/MasteryMock.ts';

function SummonerScreen() {
	return (
		<div className="page-container">
			<TopBar />
			<div className="content">
				<div className="left-side">
					<BaseInfo
						// summonerIconUrl="https://opgg-static.akamaized.net/meta/images/profile_icons/profileIcon6759.jpg"
						summonerIconUrl="../../../res/6759.png"
						summonerName="tiyst"
						level="69"
					/>
					<RankComponent ranks={mockRanks} />
					<MasteryComponent masteries={mockMasteries} />
				</div>
				<div className="right-side">
					<Base>Right 1</Base>
				</div>
			</div>
		</div>
	);
}

export default SummonerScreen;
