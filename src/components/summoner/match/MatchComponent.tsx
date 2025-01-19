import Base, { BaseBlockProps } from '../../base/Base.tsx';
import { Match } from '../../../model/Match.ts';
import './MatchComponent.scss';
import { championPlayedByPlayer, didPlayerWinMatch } from '../../../utils/MatchUtils.ts';

type MatchComponentProps = BaseBlockProps & {
	match: Match;
};

const urlUnknownChampion = 'https://cdn.communitydragon.org/latest/champion/generic/square';
const urlKnownChampion = 'https://cdn.communitydragon.org/latest/champion/{ID}/square';

const MatchComponent: React.FC<MatchComponentProps> = (data: MatchComponentProps) => {
	const { className = '' } = data;
	const participants = data.match.participants.map((p) => p.riotIdGameName);

	const playerWon = didPlayerWinMatch(data.match, data.playerName ?? 'SummonerName');
	const dynamicClass = playerWon ? 'player-won' : 'player-lost';
	const playedChampId = championPlayedByPlayer(data.match, data.playerName ?? '');
	const champIconUrl = urlKnownChampion.replace(/{ID}/, String(playedChampId));

	return (
		<Base className={`match ${className} ${dynamicClass}`} playerName={data.playerName}>
			<img
				src={champIconUrl}
				alt="Champion icon"
				onError={(e) => {
					(e.target as HTMLImageElement).src = urlUnknownChampion;
				}}
			/>
			<div className="team">
				{participants.slice(0, participants.length / 2).map((item, index) => (
					<h4 key={item + index}>{item}</h4>
				))}
			</div>
			<div className="team">
				{participants.slice(participants.length / 2).map((item, index) => (
					<h4 key={item + index}>{item}</h4>
				))}
			</div>
			<div className="textDiv">
				<h2>Map ID: {data.match.mapId}</h2>
				<h3>Result: {data.match.endOfGameResult}</h3>
			</div>
		</Base>
	);
};

export default MatchComponent;
