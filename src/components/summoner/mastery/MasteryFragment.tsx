import { ChampionMastery } from '../../../model/Summoner.ts';
import './MasteryFragment.scss';
import { getChampionSplashUrl, getMasteryIconUrl } from '../../../utils/IconsUtils.ts';
import Base from '../../base/Base.tsx';

const MasteryFragment = (data: ChampionMastery) => {
	return (
		<Base>
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
		</Base>
	);
};

export default MasteryFragment;
