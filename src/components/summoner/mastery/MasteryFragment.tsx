import { ChampionMastery } from '../../../model/Summoner.ts';
import './MasteryFragment.scss';
import { getChampionIconUrl } from '../../../utils/ChampionIconUtils.ts';

const MasteryFragment = (data: ChampionMastery) => {
	const champIconUrl = getChampionIconUrl(data.championId);

	return (
		<div className="masteryFragment">
			<img src={champIconUrl} alt="Champion icon" />
			<div className="textDiv">
				<h3>Level:{data.championLevel}</h3>
				<h3>Points:{data.championPoints}</h3>
			</div>
		</div>
	);
};

export default MasteryFragment;
