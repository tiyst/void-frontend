import '../SummonerScreen.scss';
import TopBar from '../../../components/topbar/TopBar.tsx';
import { BaseInfoSkeleton } from '../../../components/summoner/baseInfo/baseInfoSkeleton/BaseInfoSkeleton.tsx';
import { RankSkeleton } from '../../../components/summoner/rank/rankSkeleton/RankSkeleton.tsx';
import { MasterySkeleton } from '../../../components/summoner/mastery/masterySkeleton/MasterySkeleton.tsx';
import { MatchSkeleton } from '../../../components/summoner/match/matchSkeleton/MatchSkeleton.tsx';
import { TrophyRoomSkeleton } from '../../../components/trophy/trophySkeleton/TrophyRoomSkeleton.tsx';

export const SummonerScreenSkeleton = () => {
	return (
		<div className="summoner-screen-container">
			<TopBar />
			<div className="content">
				<div className="left-side">
					<BaseInfoSkeleton />
					<RankSkeleton />
					<MasterySkeleton />
				</div>
				<div className="right-side">
					<TrophyRoomSkeleton />
					<MatchSkeleton />
					<MatchSkeleton />
					<MatchSkeleton />
					<MatchSkeleton />
					<MatchSkeleton />
				</div>
			</div>
		</div>
	);
};
