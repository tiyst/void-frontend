import {ChampionMastery} from "../../../model/Summoner.ts";


const MasteryFragment = (data: ChampionMastery) => {

	return (
		<div className="masteryFragment">
			<img src="../../../../res/championPlaceholder.jpeg" alt="Champion icon"/>
			<h2>{data.championId}</h2>
			<h3>{data.championLevel}</h3>
		</div>
	)
}

export default MasteryFragment;