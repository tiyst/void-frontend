import { Rank } from '../../../model/Summoner.ts';
import './RankFragment.scss';
import { replaceString } from '../../../utils/StringUtils.ts';

const rankUrl = 'https://ddragon.leagueoflegends.com/cdn/15.1.1/img/ranked/{rank}.png';

const RankFragment = (data: Rank) => {
	return (
		<div className="rankFragment">
			<img src={replaceString(rankUrl, 'rank', data.tier.toLowerCase())} alt="Rank icon" />
			<h2>{data.division}</h2>
			<h3>{data.queueType}</h3>
		</div>
	);
};

export default RankFragment;
