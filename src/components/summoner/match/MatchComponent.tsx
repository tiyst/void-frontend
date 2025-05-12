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
	getKillParticipation,
	getMultikillBadge,
	getSummonerSpellIconUrl,
	isMatchArena,
	queueTypeTranslations,
	separateTeams,
	sortParticipantsByTeam,
	unixTimestampToDuration
} from '../../../utils/MatchUtils.ts';
import { getChampionIconUrl, urlUnknownChampion } from '../../../utils/IconsUtils.ts';
import { getRoleIconUrl } from '../../../utils/RoleUtils.ts';
import { constructRuneIconUrl, constructRuneClassUrl, runeUrlFallback } from '../../../utils/RuneUtils.ts';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { MatchExpandComponent } from './expand/MatchExpandComponent.tsx';

export type MatchComponentProps = BaseBlockProps & {
	match: Match;
	server: string;
	gameName: string;
};

export const MatchComponent = (data: MatchComponentProps) => {
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
	// TODO adapt to new design
	// if (isArena) {
	// 	return <ArenaMatchComponent match={data.match} server={data.server} gameName={data.gameName} />;
	// }

	const { topRowTeams, bottomRowTeams } = separateTeams(participants);
	const teamId = player.playerSubteamId !== 0 ? player.playerSubteamId : player.teamId;
	const team = participants.filter((p) => (p.playerSubteamId !== 0 ? p.playerSubteamId : p.teamId) === teamId);
	const killParticipation = getKillParticipation(team, player);
	const multikillBadge = getMultikillBadge(player);

	return (
		<div>
			<Base className={`match-modern ${className} ${player.win ? 'player-won' : 'player-lost'}`}>
				<div className="match-left">
					<div className="match-left__row">
						<div className="match-left__icon-wrapper">
							<img
								src={champIconUrl}
								alt="Champion icon"
								className={`match-left__champion ${player.win ? 'win' : 'loss'}`}
								onError={(e) => {
									(e.target as HTMLImageElement).src = fallbackSummonerSpellIconUrl;
								}}
							/>
							<div className={`level-badge ${player.win ? 'win' : 'loss'}`}>{player.champLevel}</div>
							{player.teamPosition !== '' && (
								<img src={getRoleIconUrl(player.teamPosition)} alt="Role Icon" className="role-image" />
							)}
						</div>
						<div className="match-left__stats">
							<div className="match-left__kda">
								<span>{player.kills} / </span>
								<span className="match-left__deaths">{player.deaths}</span>
								<span> / {player.assists}</span>
								<span className="kda-ratio" style={{ color: calculateKdaColor(kda) }}>
									{kda} KDA
								</span>
							</div>
							<div className="match-left__cs">
								{player.totalMinionsKilled} CS / {unixTimestampToDuration(data.match.gameDuration)}
							</div>
						</div>
					</div>
					<div className="match-left__second-row">
						<div className={`match-left__match-details ${player.win ? 'victory' : 'defeat'}`}>
							<span>{queueTypeTranslations[data.match.queueId]}</span>
						</div>
						<div className="match-left__footer">
							<span className={`match-left__result ${player.win ? 'victory' : 'defeat'}`}>
								{player.win ? 'Victory' : 'Defeat'}
							</span>
							<span className="match-left__ago">{calculateDatePlayed(data.match.gameEndTimestamp)}</span>
						</div>
					</div>
				</div>
				<div className="match__center">
					<div className="center-icons">
						<div className="icon-row">
							<img
								className="center-icon summoner-spell"
								src={getSummonerSpellIconUrl(player.summoner1Id)}
								alt="Summoner Spell 1"
								onError={(e) => {
									(e.target as HTMLImageElement).src = fallbackSummonerSpellIconUrl;
								}}
								draggable={false}
							/>
							<img
								className="center-icon summoner-spell"
								src={getSummonerSpellIconUrl(player.summoner2Id)}
								alt="Summoner Spell 2"
								onError={(e) => {
									(e.target as HTMLImageElement).src = fallbackSummonerSpellIconUrl;
								}}
								draggable={false}
							/>
						</div>
						<div className="icon-row">
							<img
								className="center-icon rune"
								src={constructRuneIconUrl(player.perks.styles)}
								alt="Primary Rune"
								onError={(e) => {
									(e.target as HTMLImageElement).src = runeUrlFallback;
								}}
								draggable={false}
							/>
							<img
								className="center-icon rune"
								src={constructRuneClassUrl(player.perks.styles)}
								alt="Secondary Rune"
								onError={(e) => {
									(e.target as HTMLImageElement).src = runeUrlFallback;
								}}
								draggable={false}
							/>
						</div>
					</div>
					<div className="center-extra-stats">
						<span className="vision-score" title="Vision Score">
							<svg
								width="16"
								height="16"
								viewBox="0 0 16 16"
								style={{ marginRight: 2, verticalAlign: 'middle' }}
							>
								<circle cx="8" cy="8" r="7" fill="none" stroke="#b9a7e6" strokeWidth="2" />
								<circle cx="8" cy="8" r="3" fill="#b9a7e6" />
							</svg>
							{player.visionScore}
						</span>
						<span className="kill-participation" title="Kill Participation">
							KP: {killParticipation.toFixed(0)}%
						</span>
						{multikillBadge && (
							<span
								className={`multikill-badge multikill-${multikillBadge.replace(' ', '').toLowerCase()}`}
							>
								{multikillBadge}
							</span>
						)}
					</div>
				</div>
				<div className="match__right">
					<div className="items">
						{items.map((itemId, idx) => (
							<div key={itemId + idx} className="item-container">
								{itemId !== 0 ? (
									<img
										src={getItemIconUrlByItemId(String(itemId))}
										alt={`${itemId}`}
										className="item"
									/>
								) : (
									<div className="item-empty" />
								)}
							</div>
						))}
					</div>
					<div className="teams">
						<div className="team-row">
							{topRowTeams.map((team, teamIdx) => (
								<div className="team-icons team-group" key={'top-' + teamIdx}>
									{team.map((participant, idx) => (
										<Link
											reloadDocument
											key={participant.riotIdGameName ?? 'unknownParticipantId' + idx}
											to={`/summoner/${data.server}/${participant.riotIdGameName}/${participant.riotIdTagline}`}
										>
											<img
												key={participant.championId ?? 'unknownChampionId' + idx}
												src={getChampionIconUrl(participant.championId)}
												alt={'Participant champion icon'}
												className={`team-champ-icon ${
													participant.riotIdGameName === player.riotIdGameName
														? 'active-player'
														: ''
												}`}
												onError={(e) => {
													(e.target as HTMLImageElement).src = urlUnknownChampion;
												}}
												title={participant.riotIdGameName}
											/>
										</Link>
									))}
								</div>
							))}
						</div>
						<div className="team-row">
							{bottomRowTeams.map((team, teamIdx) => (
								<div className="team-icons team-group" key={'bottom-' + teamIdx}>
									{team.map((participant, idx) => (
										<Link
											reloadDocument
											key={participant.riotIdGameName ?? 'unknownParticipantId' + idx}
											to={`/summoner/${data.server}/${participant.riotIdGameName}/${participant.riotIdTagline}`}
										>
											<img
												key={participant.championId ?? 'unknownChampionId' + idx}
												src={getChampionIconUrl(participant.championId)}
												alt={'Participant champion icon'}
												className={`team-champ-icon ${
													participant.riotIdGameName === player.riotIdGameName
														? 'active-player'
														: ''
												}`}
												onError={(e) => {
													(e.target as HTMLImageElement).src = urlUnknownChampion;
												}}
												title={participant.riotIdGameName}
											/>
										</Link>
									))}
								</div>
							))}
						</div>
					</div>
					<button className="expand-button" onClick={toggleExpand}>
						{isExpanded ? '▲' : '▼'}
					</button>
				</div>
			</Base>
			<div
				className={`expandable-content${isExpanded ? ' expanded' : ''} ${player.win ? 'player-won' : 'player-lost'}`}
			>
				<MatchExpandComponent playerName={player.riotIdGameName} match={data.match} server={data.server} />
			</div>
		</div>
	);
};
