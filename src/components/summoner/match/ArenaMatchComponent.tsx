import './MatchComponent.scss';
import './ArenaMatchComponent.scss';
import { MatchComponentProps } from './MatchComponent.tsx';
import {
	calculateArenaPlacementColor,
	calculateDatePlayed,
	calculateKDA,
	calculateKdaColor,
	chunkArenaParticipants,
	fallbackSummonerSpellIconUrl,
	findPlayer,
	getArenaPlacementForParticipant,
	getItemIconUrlByItemId,
	getItemsFromParticipant,
	getMapUrlByMapId,
	getSummonerSpellIconUrl,
	queueTypeTranslations,
	sortParticipantsByTeam
} from '../../../utils/MatchUtils.ts';
import { getChampionIconUrl, urlUnknownChampion } from '../../../utils/IconsUtils.ts';
import { useState } from 'react';
import Base from '../../base/Base.tsx';
import { getRoleIconUrl } from '../../../utils/RoleUtils.ts';
import { Link } from 'react-router-dom';
import { truncatePlayerName } from '../../../utils/StringUtils.ts';
import { MatchExpandComponent } from './expand/MatchExpandComponent.tsx';

export const ArenaMatchComponent = (data: MatchComponentProps) => {
	const { className = '' } = data;
	const participants = sortParticipantsByTeam(data.match.participants); // ordered due to arena scrambling subteams
	const player = findPlayer(data.match, data.gameName);
	const items = getItemsFromParticipant(player);

	const champIconUrl = getChampionIconUrl(player.championId);
	const kda = calculateKDA(player.kills, player.deaths, player.assists);
	const [isExpanded, setIsExpanded] = useState(false);

	const toggleExpand = () => {
		setIsExpanded(!isExpanded);
	};

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
				<div className="arena-player-stats">
					<div>
						<h2>
							<span>{player.kills}</span> / <span style={{ color: '#F47174' }}>{player.deaths}</span> /{' '}
							<span>{player.assists}</span>
						</h2>
						<div
							style={{
								display: 'flex',
								flexDirection: 'row',
								alignItems: 'center',
								justifyContent: 'space-around'
							}}
						>
							<h2>
								<span style={{ color: calculateArenaPlacementColor(player) }}>
									{getArenaPlacementForParticipant(player)}
								</span>
							</h2>
							<h4>
								<span style={{ fontSize: '22px', fontWeight: 'bold', color: calculateKdaColor(kda) }}>
									{kda}
								</span>{' '}
								KDA
							</h4>
						</div>
					</div>
					<div className="arena-items">
						{items.map((itemId, index) => (
							<div key={itemId + index} className="arena-item-container">
								{itemId !== 0 ? (
									<img
										src={getItemIconUrlByItemId(String(itemId))}
										alt={`${itemId}`}
										className="arena-item-icon"
									/>
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
				</div>
				<div className="arena-teams">
					{chunkArenaParticipants(participants, 4).map((participantArray) => (
						<div
							key={participantArray.length > 0 ? participantArray[0].participantId : crypto.randomUUID()}
							className={'arena-team'}
						>
							{participantArray.map((participant, index) => (
								<Link
									reloadDocument
									className="arena-name"
									key={participant.riotIdGameName ?? 'unknownParticipantId' + index}
									to={`/summoner/${data.server}/${participant.riotIdGameName}/${participant.riotIdTagline}`}
									style={{
										textDecoration: 'none',
										fontWeight:
											participant.riotIdGameName === player.riotIdGameName ? 'bold' : 'normal'
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
					))}
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
