import Base, { BaseBlockProps } from '../../base/Base.tsx';
import { Match } from '../../../model/Match.ts';
import './MatchComponent.scss';
import {
	calculateDatePlayed,
	calculateKDA,
	calculateKdaColor,
	fallbackSummonerSpellIconUrl,
	findPlayer,
	getItemIconUrlByItemId,
	getItemsFromParticipant,
	getMapUrlByMapId,
	getSummonerSpellIconUrl,
	isMatchArena,
	queueTypeTranslations,
	sortParticipantsByTeam,
	unixDurationToMinutes,
	unixTimestampToDuration
} from '../../../utils/MatchUtils.ts';
import { getChampionIconUrl, urlUnknownChampion } from '../../../utils/IconsUtils.ts';
import { getRoleIconUrl } from '../../../utils/RoleUtils.ts';
import { truncatePlayerName } from '../../../utils/StringUtils.ts';
import { constructRuneIconUrl, constructRuneClassUrl, runeUrlFallback } from '../../../utils/RuneUtils.ts';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { MatchExpandComponent } from './expand/MatchExpandComponent.tsx';
import { ArenaMatchComponent } from './ArenaMatchComponent.tsx';

export type MatchComponentProps = BaseBlockProps & {
	match: Match;
	server: string;
	gameName: string;
};

// TODO  send last match time, match pagination

export const MatchComponent: React.FC<MatchComponentProps> = (data: MatchComponentProps) => {
	const { className = '' } = data;
	const participants = sortParticipantsByTeam(data.match.participants); // ordered due to arena scrambling subteams
	const player = findPlayer(data.match, data.gameName);
	const items = getItemsFromParticipant(player);

	const champIconUrl = getChampionIconUrl(player.championId);
	const kda = calculateKDA(player.kills, player.deaths, player.assists);
	const isArena = isMatchArena(data.match);

	const [isExpanded, setIsExpanded] = useState(false);

	const toggleExpand = () => {
		setIsExpanded(!isExpanded);
	};

	// I don't like this, but it's the easiest and quickest way. Doesn't have to be elegant for a temporary game mode
	if (isArena) {
		return <ArenaMatchComponent match={data.match} server={data.server} gameName={data.gameName} />;
	}

	return (
		<div>
			<Base className={`match ${className} ${player.win ? 'player-won' : 'player-lost'}`}>
				<div className="queue-type">
					<h2>{queueTypeTranslations[data.match.queueId] ?? data.match.gameMode}</h2>
					<h4>{calculateDatePlayed(data.match.gameEndTimestamp)}</h4>
				</div>
				<div className="image-container">
					<img src={getMapUrlByMapId(data.match.mapId)} className="map-image" alt="Map icon" />
					<img
						src={champIconUrl}
						alt="Champion icon"
						onError={(e) => {
							(e.target as HTMLImageElement).src = urlUnknownChampion;
						}}
					/>
					<div className="level-badge">{player.champLevel}</div>
					{player.teamPosition !== '' && (
						<img src={getRoleIconUrl(player.teamPosition)} alt="Role Icon" className="role-image" />
					)}
				</div>
				<div className="summoner-spells">
					{[player.summoner1Id, player.summoner2Id].map((id, index) => (
						<img
							key={id ?? 'unknownSummonerId' + index}
							src={getSummonerSpellIconUrl(id)}
							alt={`Summoner spell ${id}`}
							onError={(e) => {
								(e.target as HTMLImageElement).src = fallbackSummonerSpellIconUrl;
							}}
						/>
					))}
				</div>
				{!isArena && (
					<div className="summoner-runes">
						<img
							src={constructRuneIconUrl(player.perks.styles)}
							alt="Keystone rune"
							onError={(e) => {
								(e.target as HTMLImageElement).src = runeUrlFallback;
							}}
						/>
						<img
							src={constructRuneClassUrl(player.perks.styles)}
							alt="Secondary rune"
							onError={(e) => {
								(e.target as HTMLImageElement).src = runeUrlFallback;
							}}
						/>
					</div>
				)}
				<div className="player-stats">
					<h2>
						<span>{player.kills}</span> / <span style={{ color: '#F47174' }}>{player.deaths}</span> /{' '}
						<span>{player.assists}</span>
					</h2>
					<h4>
						<span style={{ fontSize: '22px', fontWeight: 'bold', color: calculateKdaColor(kda) }}>
							{kda}
						</span>{' '}
						KDA
					</h4>
					<h4>{`${player.totalMinionsKilled}CS (${(player.totalMinionsKilled / unixDurationToMinutes(data.match.gameDuration)).toFixed(1)})`}</h4>
					<h4>{unixTimestampToDuration(data.match.gameDuration)}</h4>
				</div>
				<div className="items">
					{items.map((itemId, index) => (
						<div key={itemId + index} className="item-container">
							{itemId !== 0 ? (
								<img src={getItemIconUrlByItemId(String(itemId))} alt={`${itemId}`} className="item" />
							) : (
								<div
									style={{
										opacity: '0.2',
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
				<div className="teams">
					<div className="team leftTeam">
						{participants.slice(0, participants.length / 2).map((participant, index) => (
							<Link
								reloadDocument
								className="name"
								key={participant.riotIdGameName ?? 'unknownParticipantId' + index}
								to={`/summoner/${data.server}/${participant.riotIdGameName}/${participant.riotIdTagline}`}
								style={{
									textDecoration: 'none',
									fontWeight: participant.riotIdGameName === player.riotIdGameName ? 'bold' : 'normal'
								}}
							>
								{truncatePlayerName(participant.riotIdGameName)}
								<img
									key={participant.championId ?? 'unknownChampionId' + index}
									src={getChampionIconUrl(participant.championId)}
									alt={'Participant champion icon'}
									onError={(e) => {
										(e.target as HTMLImageElement).src = urlUnknownChampion;
									}}
								/>
							</Link>
						))}
					</div>
					<div className="team rightTeam">
						{participants.slice(participants.length / 2).map((participant, index) => (
							<Link
								reloadDocument
								className="name"
								key={participant.riotIdGameName ?? 'unknownParticipantId' + index}
								to={`/summoner/${data.server}/${participant.riotIdGameName}/${participant.riotIdTagline}`}
								style={{
									textDecoration: 'none',
									fontWeight: participant.riotIdGameName === player.riotIdGameName ? 'bold' : 'normal'
								}}
							>
								<img
									key={participant.championId ?? 'unknownChampIconId' + index}
									src={getChampionIconUrl(participant.championId)}
									alt={'Participant champion icon'}
									onError={(e) => {
										(e.target as HTMLImageElement).src = urlUnknownChampion;
									}}
								/>
								{truncatePlayerName(participant.riotIdGameName)}
							</Link>
						))}
					</div>
				</div>
				<button className="expand-button" onClick={toggleExpand}>
					{isExpanded ? '▲' : '▼'}
				</button>
			</Base>
			{isExpanded && (
				<div
					className={`expandable-content ${isExpanded ? 'expanded' : ''} ${player.win ? 'player-won' : 'player-lost'}`}
				>
					<MatchExpandComponent playerName={player.riotIdGameName} match={data.match} />
				</div>
			)}
		</div>
	);
};
