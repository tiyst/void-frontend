import Base, { BaseBlockProps } from '../../base/Base.tsx';
import { Match } from '../../../model/Match.ts';
import './MatchComponent.scss';
import { didPlayerWinMatch, findPlayer, getSummonerSpellIconUrl } from '../../../utils/MatchUtils.ts';
import { getChampionIconUrl, urlUnknownChampion } from '../../../utils/ChampionIconUtils.ts';
import { getRoleIconUrl } from '../../../utils/RoleUtils.ts';
import { replaceString } from '../../../utils/StringUtils.ts';

type MatchComponentProps = BaseBlockProps & {
	match: Match;
};

const itemUrl = 'https://ddragon.leagueoflegends.com/cdn/15.1.1/img/item/{itemID}.png';
const itemFields = ['item0', 'item1', 'item2', 'item3', 'item4', 'item5'];

// TODO Add showPlayedMap, expandable fragment to show details, player names are links to their summoner pages
const MatchComponent: React.FC<MatchComponentProps> = (data: MatchComponentProps) => {
	const { className = '' } = data;
	const participants = data.match.participants;

	const playerWon = didPlayerWinMatch(data.match, data.playerName ?? 'SummonerName');
	const player = findPlayer(data.match, data.playerName ?? '');
	const playedChampId = player.championId;
	const champIconUrl = getChampionIconUrl(playedChampId);

	const roleIconUrl = getRoleIconUrl(player.teamPosition);
	return (
		<Base className={`match ${className} ${playerWon ? 'player-won' : 'player-lost'}`} playerName={data.playerName}>
			<div className="image-container">
				<img
					src={champIconUrl}
					alt="Champion icon"
					onError={(e) => {
						(e.target as HTMLImageElement).src = urlUnknownChampion;
					}}
				/>
				<img src={roleIconUrl} alt="Role Icon" className="role-image" />
			</div>
			<div className="summoner-spells">
				{[player.summoner1Id, player.summoner2Id].map((id, index) => (
					<img key={id + index} src={getSummonerSpellIconUrl(id)} alt={`Summoner icon ${id}`} />
				))}
			</div>
			<div className="items">
				{itemFields.map((key) => (
					<div key={key}>
						<img
							src={replaceString(itemUrl, 'itemID', player[key])}
							alt={`${key}`}
							className="item"
							onError={(e) => {
								(e.target as HTMLImageElement).src = urlUnknownChampion;
							}}
						/>
					</div>
				))}
			</div>
			<div className="teams">
				<div className="team leftTeam">
					{participants.slice(0, participants.length / 2).map((participant, index) => (
						<h4 key={participant.riotIdGameName + index}>
							{participant.riotIdGameName}
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
							{participant.riotIdGameName}
						</h4>
					))}
				</div>
			</div>
			<div className="matchText">
				<h2>Map ID: {data.match.mapId}</h2>
			</div>
		</Base>
	);
};

export default MatchComponent;
