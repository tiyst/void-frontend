import './ExpandParticipantFragment.scss';
import { Participant } from '../../../../model/Match.ts';
import { getChampionIconUrl, urlUnknownChampion } from '../../../../utils/IconsUtils.ts';
import {
	calculateArenaPlacementColor,
	calculateKDA,
	calculateKdaColor,
	getArenaPlacementForParticipant,
	getItemIconUrlByItemId,
	getItemsFromParticipant,
	isMatchArenaByParticipant
} from '../../../../utils/MatchUtils.ts';
import { ExpandDamageBar } from './damageBar/ExpandDamageBar.tsx';

export type ExpandParticipantProps = {
	participant: Participant;
	highestTotalDamage: number;
};

export const ExpandParticipantFragment = (data: ExpandParticipantProps) => {
	const player = data.participant;
	const items = getItemsFromParticipant(player);

	const kda = calculateKDA(player.kills, player.deaths, player.assists);
	const kdaColor = calculateKdaColor(kda);
	const teamId = player.playerSubteamId === 0 ? player.teamId : player.playerSubteamId;
	const isArena = isMatchArenaByParticipant(player);

	return (
		<div
			className="expand-participant"
			style={{
				border: `3px solid var(--team${teamId}-border)`,
				background: `var(--team${teamId}-background)`
			}}
		>
			<div style={{ display: 'flex', flexDirection: 'row', gap: '0.5rem' }}>
				<img
					src={getChampionIconUrl(player.championId)}
					alt={'Expanded player champion icon'}
					onError={(e) => {
						(e.target as HTMLImageElement).src = urlUnknownChampion;
					}}
				/>
				<div>{player.riotIdGameName}</div>
			</div>
			<div
				style={{
					display: 'flex',
					flexDirection: 'row',
					gap: '1rem',
					justifyContent: 'center',
					alignItems: 'center'
				}}
			>
				<h3 style={{ textAlign: 'center' }}>
					<span>{player.kills}</span> / <span style={{ color: '#F47174' }}>{player.deaths}</span> /{' '}
					<span>{player.assists}</span>
				</h3>
			</div>
			<div
				style={{
					display: 'flex',
					flexDirection: 'row',
					gap: '1rem',
					justifyContent: 'center',
					alignItems: 'center'
				}}
			>
				<h4>
					<span style={{ fontWeight: 'bold', color: kdaColor }}>{kda}</span> KDA
				</h4>
			</div>
			<div>
				<h4>{player.totalDamageDealtToChampions}</h4>
				<ExpandDamageBar max={data.highestTotalDamage} participant={player} />
			</div>
			{!isArena && <div style={{ textAlign: 'end' }}>{player.totalMinionsKilled} CS</div>}
			{isArena && (
				<div style={{ textAlign: 'center', fontWeight: 'bold' }}>
					<span style={{ color: calculateArenaPlacementColor(player) }}>
						{getArenaPlacementForParticipant(player)}
					</span>
				</div>
			)}
			<div className="expandedItems">
				{items.map((itemId, index) => (
					<div key={itemId + index} className="item-container">
						{itemId !== 0 ? (
							<img
								src={getItemIconUrlByItemId(String(itemId))}
								alt={`${itemId + index + 'expand'}`}
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
