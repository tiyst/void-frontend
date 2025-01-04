import {ChampionMastery} from "../../../model/Summoner.ts";
import "./MasteryFragment.scss"


const MasteryFragment = (data: ChampionMastery) => {

	return (
		<div className="masteryFragment">
			<img src="../../../../res/championPlaceholder.jpeg" alt="Champion icon"/>
			<div className="textDiv">
				<h2>ID: {data.championId}</h2>
				<h3>Level:{data.championLevel}</h3>
				<h3>Points:{data.championPoints}</h3>
			</div>
		</div>
	)
}

export default MasteryFragment;