import Base, { BaseBlockProps } from '../../base/Base.tsx';
import { Match, Participant } from '../../../model/Match.ts';
import './MatchComponent.scss';
import {
	calculateKDA, calculateKdaColor,
	fallbackSummonerSpellIconUrl,
	findPlayer, getMapUrlByMapId,
	getSummonerSpellIconUrl, queueTypeTranslations,
	unixDurationToMinutes,
	unixTimestampToDuration
} from '../../../utils/MatchUtils.ts';
import { getChampionIconUrl, urlUnknownChampion } from '../../../utils/ChampionIconUtils.ts';
import { getRoleIconUrl } from '../../../utils/RoleUtils.ts';
import { replaceString, truncatePlayerName } from '../../../utils/StringUtils.ts';
import { constructRuneIconUrl, constructRuneClassUrl, runeUrlFallback } from '../../../utils/RuneUtils.ts';
import { Link, useParams } from 'react-router-dom';

type MatchComponentProps = BaseBlockProps & {
	match: Match;
};

const itemUrl = 'https://ddragon.leagueoflegends.com/cdn/15.1.1/img/item/{itemID}.png';

// FIXME Without reloading document on <Link> makes rerender fail

// TODO Add expandable fragment to show details change map based on which played, when was the match played
//  send last match time, match pagination

export const MatchComponent: React.FC<MatchComponentProps> = (data: MatchComponentProps) => {
	const { className = '' } = data;
	const { server, gameName } = useParams();
	const participants = data.match.participants;
	const player = findPlayer(data.match, gameName ?? 'Unknown');
	const playerWon = player.win;

	const itemFields = Object.keys(player).filter((key) => /^item[0-5]$/.test(key)) as (keyof Participant)[];
	const playedChampId = player.championId;
	const champIconUrl = getChampionIconUrl(playedChampId);
	const kda = calculateKDA(player.kills, player.deaths, player.assists);
	const kdaColor = calculateKdaColor(kda);

	return (
		<Base className={`match ${className} ${playerWon ? 'player-won' : 'player-lost'}`}>
			<h2 className="queue-type">{queueTypeTranslations[data.match.queueId]}</h2>
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
				{player.teamPosition !== '' &&
					<img src={getRoleIconUrl(player.teamPosition)} alt="Role Icon" className="role-image" />}
			</div>
			<div className="pre-game-choose">
				{[player.summoner1Id, player.summoner2Id].map((id, index) => (
					<img key={id ?? 'unknownSummonerId' + index} src={getSummonerSpellIconUrl(id)} alt={`Summoner spell ${id}`}
						 onError={(e) => {
							 (e.target as HTMLImageElement).src = fallbackSummonerSpellIconUrl;
						 }}
					/>
				))}
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
			<div className="player-stats">
				<h2>
 					<span>{player.kills}</span> / <span
					style={{ color: '#F47174' }}>{player.deaths}</span> / <span>{player.assists}</span>
				</h2>
				<h4>
					<span style={{ fontSize: '22px', fontWeight: 'bold', color: kdaColor }}>{kda}</span> KDA
				</h4>
				<h4>{`${player.totalMinionsKilled}CS (${(player.totalMinionsKilled / unixDurationToMinutes(data.match.gameDuration)).toFixed(1)})`}</h4>
				<h4>{unixTimestampToDuration(data.match.gameDuration)}</h4>
			</div>
			<div className="items">
				{itemFields.map((key, index) => (
					<div key={key ?? 'unknownItemField' + index} className="item-container">
						{player[key] !== 0 ? (
							<img
								src={replaceString(itemUrl, 'itemID', String(player[key]))}
								alt={`${key}`}
								className="item"
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
			<div className="teams">
				<div className="team leftTeam">
					{participants.slice(0, participants.length / 2).map((participant, index) => (
						<Link reloadDocument
							  className="name"
							  key={participant.riotIdGameName ?? 'unknownParticipantId' + index}
							  to={`/summoner/${server}/${participant.riotIdGameName}/${participant.riotIdTagline}`}
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
						<Link reloadDocument
							  className="name"
							  key={participant.riotIdGameName ?? 'unknownParticipantId' + index}
							  to={`/summoner/${server}/${participant.riotIdGameName}/${participant.riotIdTagline}`}
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
		</Base>
	);
};
