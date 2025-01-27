import { Rank } from '../../../model/Summoner.ts';
import './RankFragment.scss';
import { getRankUrl } from '../../../utils/RankUtils.ts';

const RankFragment = (queueType:string, data: Rank) => {
	return (
		<div className="rankFragment">
			<img src={getRankUrl(data?.tier?.toLowerCase() || 'unranked')} alt="Rank icon" />

			<div className="rankText">
				<h2>{queueType}</h2>
				{data?.tier ?
					<>
						<h3>{data.tier} {data.division}	{data.leaguePoints} LP</h3>
						<h4>{data.wins}W / {data.losses}L</h4>
					</>
				:	<h3>Unranked</h3>
				}
			</div>
		</div>
	);
};

export default RankFragment;
