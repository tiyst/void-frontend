import './ExpandParticipantFragment.scss';
import { Participant } from '../../../../model/Match.ts';
import { getChampionIconUrl, urlUnknownChampion } from '../../../../utils/ChampionIconUtils.ts';
import { getItemIconUrlByItemId } from '../../../../utils/MatchUtils.ts';

export type ExpandParticipantProps = {
	participant: Participant;
}

export const ExpandParticipantFragment = (data: ExpandParticipantProps) => {
	const participant = data.participant;
	const itemFields = Object.keys(participant).filter((key) => /^item[0-5]$/.test(key)) as (keyof Participant)[];

	return (
		<div className="expand-participant">
			<img src={getChampionIconUrl(participant.championId)}
				 alt={'Expanded participant champion icon'}
				 onError={(e) => {
					 (e.target as HTMLImageElement).src = urlUnknownChampion;
				 }} />
			<h3>{participant.riotIdGameName}</h3>
			{/*// KDA*/}
			<h3>{participant.totalDamageDealtToChampions}</h3>
			<h3>{participant.totalMinionsKilled} CS</h3>
			{itemFields.map((key, index) => (
				<div key={key ?? 'unknownItemField' + index} className="item-container">
					{participant[key] !== 0 ? (
						<img
							src={getItemIconUrlByItemId(String(participant[key]))}
							alt={`${key + index + "expand"}`}
							className="item"
						/>
					) : (
						<div
							style={{
								backgroundColor: 'rgb(193, 155, 230)',
								width: '100%',
								height: '100%',
								borderRadius: '25%'
							}}
						/>
					)}
				</div>
			))}
		</div>
	);
};