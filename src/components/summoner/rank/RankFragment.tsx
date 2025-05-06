import { Rank } from '../../../model/Summoner.ts';
import './RankFragment.scss';
import { calculateWinRate, getRankUrl } from '../../../utils/RankUtils.ts';

const RankFragment = (queueType: string, data: Rank) => {
	return (
		<div className="rank-fragment">
			<img
				src={getRankUrl(data?.tier?.toLowerCase() || 'unranked')}
				alt="Rank icon"
				className="rank-fragment__icon"
			/>
			<div className="rank-fragment__text">
				<div className="rank-fragment__queue">{queueType}</div>
				<div className="rank-fragment__tier">
					{data?.tier ? (
						<>
							{data.tier} {data.division} - {data.leaguePoints} LP
						</>
					) : (
						<>Unranked</>
					)}
				</div>
				{data?.tier && (
					<div className="rank-fragment__wr">
						{data.wins} / {data.losses} - <span className="wr-percentage">{calculateWinRate(data.wins, data.losses)}</span>WR
					</div>
				)}
			</div>
		</div>
	);
};

export default RankFragment;
