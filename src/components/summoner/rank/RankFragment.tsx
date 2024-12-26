import {Rank} from "../../../model/Summoner.ts";
import "./RankFragment.scss";

const RankFragment = (data: Rank) => {

	return (
		<div className="rankFragment">
			<img src="../../../../res/platinum.png" alt="Rank icon"/>
			<h2>{data.division} {data.id}</h2>
			<h3>{data.queueType}</h3>
		</div>
	);
}

export default RankFragment;