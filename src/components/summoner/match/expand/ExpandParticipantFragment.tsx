import './ExpandParticipantFragment.scss';
import { Participant } from '../../../../model/Match.ts';
import { getChampionIconUrl, urlUnknownChampion } from '../../../../utils/ChampionIconUtils.ts';
import { calculateKDA, calculateKdaColor, getItemIconUrlByItemId } from '../../../../utils/MatchUtils.ts';
import { ExpandDamageBar } from './damageBar/ExpandDamageBar.tsx';

export type ExpandParticipantProps = {
	participant: Participant;
	highestTotalDamage: number;
}

export const ExpandParticipantFragment = (data: ExpandParticipantProps) => {
	const player = data.participant;
	const itemFields = Object.keys(player).filter((key) => /^item[0-5]$/.test(key)) as (keyof Participant)[];

	const kda = calculateKDA(player.kills, player.deaths, player.assists);
	const kdaColor = calculateKdaColor(kda);
	const teamId = player.teamId;

	return (
		<div className="expand-participant"
			 style={{
				 border: `2px solid var(--team${teamId}-border)`,
				 background: `var(--team${teamId}-background)`
			 }}>
			<div style={{ display: 'flex', flexDirection: 'row', gap: '0.5rem' }}>
				<img src={getChampionIconUrl(player.championId)}
					 alt={'Expanded player champion icon'}
					 onError={(e) => {
						 (e.target as HTMLImageElement).src = urlUnknownChampion;
					 }} />
				<div>{player.riotIdGameName}</div>
			</div>
			<div style={{ display: 'flex', flexDirection: 'row', gap: '1rem', justifyContent: 'center', alignItems: 'center' }}>
				<h3 style={{ textAlign: 'center' }}>
					<span>{player.kills}</span> / <span
					style={{ color: '#F47174' }}>{player.deaths}</span> / <span>{player.assists}</span>
				</h3>
			</div>
			<div style={{ display: 'flex', flexDirection: 'row', gap: '1rem', justifyContent: 'center', alignItems: 'center' }}>
				<h4>
					<span style={{ fontWeight: 'bold', color: kdaColor }}>{kda}</span> KDA
				</h4>
			</div>
			<div>
				<h4>{player.totalDamageDealtToChampions}</h4>
				<ExpandDamageBar max={data.highestTotalDamage} participant={player} />
			</div>
			<div style={{ textAlign: 'end' }}>{player.totalMinionsKilled} CS</div>
			<div className="expandedItems">
				{itemFields.map((key, index) => (
					<div key={key ?? 'unknownItemField' + index} className="item-container">
						{player[key] !== 0 ? (
							<img
								src={getItemIconUrlByItemId(String(player[key]))}
								alt={`${key + index + 'expand'}`}
								className="item"
							/>
						) : (
							<div
								style={{
									opacity: '0.6',
									backgroundColor: 'gray',
									width: '30px',
									height: '30px',
									borderRadius: '35%'
								}}
							/>
						)}
					</div>
				))}
			</div>
		</div>
	);
};