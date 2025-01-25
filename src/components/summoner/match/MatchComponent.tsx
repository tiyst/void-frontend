import Base, { BaseBlockProps } from '../../base/Base.tsx';
import { Match, Participant } from '../../../model/Match.ts';
import './MatchComponent.scss';
import {
	calculateKDA,
	didPlayerWinMatch,
	findPlayer, getMapUrlByMapId,
	getSummonerSpellIconUrl,
	unixDurationToMinutes,
	unixTimestampToDuration
} from '../../../utils/MatchUtils.ts';
import { getChampionIconUrl, urlUnknownChampion } from '../../../utils/ChampionIconUtils.ts';
import { getRoleIconUrl } from '../../../utils/RoleUtils.ts';
import { replaceString, truncatePlayerName } from '../../../utils/StringUtils.ts';
import { constructPrimaryRuneIconUrl, constructSecondaryRuneClassUrl, fallbackRuneIconUrl } from '../../../utils/RuneUtils.ts';

type MatchComponentProps = BaseBlockProps & {
	match: Match;
};

const itemUrl = 'https://ddragon.leagueoflegends.com/cdn/15.1.1/img/item/{itemID}.png';

// TODO Add expandable fragment to show details, player names are links to their summoner pages
//  red death text in KDA, display game mode name, KDA coloring based on performance, no item as an empty div
export const MatchComponent: React.FC<MatchComponentProps> = (data: MatchComponentProps) => {
	const { className = '' } = data;
	const participants = data.match.participants;

	const playerWon = didPlayerWinMatch(data.match, data.playerName ?? 'SummonerName');
	const player = findPlayer(data.match, data.playerName ?? '');
	const itemFields = Object.keys(player).filter((key) => /^item[0-5]$/.test(key)) as (keyof Participant)[];
	const playedChampId = player.championId;
	const champIconUrl = getChampionIconUrl(playedChampId);

	const roleIconUrl = getRoleIconUrl(player.teamPosition);
	return (
		<Base className={`match ${className} ${playerWon ? 'player-won' : 'player-lost'}`} playerName={data.playerName}>
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
				<img src={roleIconUrl} alt="Role Icon" className="role-image" />
			</div>
			<div className="summoner-spells">
				{[player.summoner1Id, player.summoner2Id].map((id, index) => (
					<img key={id + index} src={getSummonerSpellIconUrl(id)} alt={`Summoner icon ${id}`} />
				))}
			</div>
			<div className="runes">
				<img
					src={constructPrimaryRuneIconUrl(player.perks.styles)}
					alt="Keystone rune"
					onError={(e) => {
						(e.target as HTMLImageElement).src = fallbackRuneIconUrl;
					}}
				/>
				<img
					src={constructSecondaryRuneClassUrl(player.perks.styles)}
					alt="Secondary rune"
					onError={(e) => {
						(e.target as HTMLImageElement).src = fallbackRuneIconUrl;
					}}
				/>
			</div>
			<div className="items">
				{itemFields.map((key) => (
					<div key={key}>
						<img
							src={replaceString(itemUrl, 'itemID', String(player[key]))}
							alt={`${key}`}
							className="item"
							onError={(e) => {
								(e.target as HTMLImageElement).src = urlUnknownChampion;
							}}
						/>
					</div>
				))}
			</div>
			<div className="player-stats">
				<h2>{`${player.kills} / ${player.deaths} / ${player.assists}`}</h2>
				<h4>{`${calculateKDA(player.kills, player.assists, player.deaths)} KDA`}</h4>
				<h4>{`${player.totalMinionsKilled}CS (${(player.totalMinionsKilled / unixDurationToMinutes(data.match.gameDuration)).toFixed(1)})`}</h4>
				<h4>{unixTimestampToDuration(data.match.gameDuration)}</h4>
			</div>
			<div className="teams">
				<div className="team leftTeam">
					{participants.slice(0, participants.length / 2).map((participant, index) => (
						<h4 key={participant.riotIdGameName + index}>
							{truncatePlayerName(participant.riotIdGameName)}
							<img
								key={participant.championId + index}
								src={getChampionIconUrl(participant.championId)}
								alt={'Participant champion icon'}
								onError={(e) => {
									(e.target as HTMLImageElement).src = urlUnknownChampion;
								}}
							/>
						</h4>
					))}
				</div>
				<div className="team rightTeam">
					{participants.slice(participants.length / 2).map((participant, index) => (
						<h4 key={participant.riotIdGameName + index}>
							<img
								key={participant.championId + index}
								src={getChampionIconUrl(participant.championId)}
								alt={'Participant champion icon'}
								onError={(e) => {
									(e.target as HTMLImageElement).src = urlUnknownChampion;
								}}
							/>
							{truncatePlayerName(participant.riotIdGameName)}
						</h4>
					))}
				</div>
			</div>
		</Base>
	);
};
