import { ChampionMastery } from '../../../model/Summoner.ts';
import './MasteryFragment.scss';
import { getChampionSplashUrl, getMasteryIconUrl } from '../../../utils/IconsUtils.ts';

const MasteryFragment = (data: ChampionMastery) => {
	return (
		<div className="masteryFragment">
			<img src={getChampionSplashUrl(data.championId)} alt="Champion splash" className="splashBckg" />
			<img src={getMasteryIconUrl(data.championLevel)} alt="Mastery icon" className="masteryIcon" />
			<div className="textDiv">
				<h3>
					Level: <b>{data.championLevel}</b>
				</h3>
				<h3>
					Points: <b>{data.championPoints}</b>
				</h3>
			</div>
		</div>
	);
};

export default MasteryFragment;
