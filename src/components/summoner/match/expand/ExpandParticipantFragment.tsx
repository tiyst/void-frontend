import './ExpandParticipantFragment.scss';
import { Participant } from '../../../../model/Match.ts';
import { getChampionIconUrl, urlUnknownChampion } from '../../../../utils/IconsUtils.ts';
import {
	calculateKDA,
	calculateKdaColor,
	getItemIconUrlByItemId,
	getItemsFromParticipant,
	isMatchArenaByParticipant
} from '../../../../utils/MatchUtils.ts';
import { ExpandDamageBar } from './damageBar/ExpandDamageBar.tsx';
import { Link } from 'react-router-dom';

export type ExpandParticipantProps = {
	participant: Participant;
	isMainPlayer: boolean;
	highestTotalDamage: number;
	server: string;
};

export const ExpandParticipantFragment = (data: ExpandParticipantProps) => {
	const player = data.participant;
	const items = getItemsFromParticipant(player);

	const kda = calculateKDA(player.kills, player.deaths, player.assists);
	const kdaColor = calculateKdaColor(kda);
	const teamId = player.playerSubteamId === 0 ? player.teamId : player.playerSubteamId;
	const isArena = isMatchArenaByParticipant(player);

	// TODO rename epf?
	return (
		<div className="epf-row">
			<div
				className="epf-team-bar"
				style={{
					background: `var(--team${teamId}-border)`
				}}
			/>
			<div className="epf-cell epf-player">
				<img
					className="epf-champ-icon"
					src={getChampionIconUrl(data.participant.championId)}
					alt="Champion"
					onError={(e) => {
						(e.target as HTMLImageElement).src = urlUnknownChampion;
					}}
				/>
				<span className="epf-player-name">
					<Link
						reloadDocument
						className="name"
						key={player.riotIdGameName ?? 'unknownPlayerGameName'}
						to={`/summoner/${data.server}/${player.riotIdGameName}/${player.riotIdTagline}`}
						style={{
							textDecoration: 'none',
							fontWeight: data.isMainPlayer ? 'bold' : 'normal'
						}}
					>
					{data.participant.riotIdGameName}
					</Link>
				</span>
			</div>
			<div className="epf-cell epf-kda">
                <span>
                    <span className="epf-kills">{data.participant.kills}</span>
                    <span className="epf-sep">/</span>
                    <span className="epf-deaths">{data.participant.deaths}</span>
                    <span className="epf-sep">/</span>
                    <span className="epf-assists">{data.participant.assists}</span>
                </span>
			</div>
			<div className="epf-cell epf-kda-value" style={{ color: kdaColor }}>
				{kda}
			</div>
			<div className="epf-cell epf-cs">
				{data.participant.totalMinionsKilled}
				{!isArena && <span> CS</span>}
			</div>
			<div className="epf-cell epf-damage">
				<h4>{player.totalDamageDealtToChampions}</h4>
				<ExpandDamageBar max={data.highestTotalDamage} participant={player} />
			</div>
			<div className="epf-cell epf-items">
				{items.map((itemId, index) =>
					itemId !== 0 ? (
						<img
							key={itemId + index}
							src={getItemIconUrlByItemId(String(itemId))}
							alt=""
							className="epf-item"
						/>
					) : (
						<div key={itemId + index} className="epf-item-empty" />
					)
				)}
			</div>
		</div>
	);
};
