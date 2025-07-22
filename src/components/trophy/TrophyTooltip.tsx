import { Trophy } from '../../model/Summoner.ts';
import { Participant } from '../../model/Match.ts';
import { getChampionIconUrl } from '../../utils/IconsUtils.ts';
import './TrophyTooltip.scss';
import { queueTypeTranslations } from '../../utils/MatchUtils.ts';

export type TrophyTooltipProps = {
	trophy: Trophy;
	x: number;
	y: number;
	show: boolean;
	hasMatch: boolean;
	playerGameName: string;
};

type ChampionIconProps = {
	championId: number;
};

type PlayerRowProps = {
	player1: Participant;
	player2: Participant;
	showVS: boolean;
};

const ChampionIcon = ({ championId }: ChampionIconProps) => (
	<div className="tooltip-champion-icon">
		<img src={getChampionIconUrl(championId)} alt={`champion ID ${championId}`} />
	</div>
);

const PlayerRow = ({ player1, player2, showVS }: PlayerRowProps) => (
	<div className="team-row">
		<span className="player-name player-left">{player1.riotIdGameName}</span>
		<ChampionIcon championId={player1.championId} />
		<span className="vs-center">{showVS ? 'VS' : ''}</span>
		<ChampionIcon championId={player2.championId} />
		<span className="player-name player-right">{player2.riotIdGameName}</span>
	</div>
);

const renderTeamLayout = (team1: Participant[], team2: Participant[]) => {
	const maxTeamSize = Math.max(team1.length, team2.length);
	const middleRowIndex = Math.floor(maxTeamSize / 2);

	return (
		<div className="tooltip-teams">
			{team1
				.map((player1, index) => {
					const player2 = team2[index];
					if (!player2) return null;

					return (
						<PlayerRow
							key={`team-row-${player1.participantId}-${player2.participantId}`}
							player1={player1}
							player2={player2}
							showVS={index === middleRowIndex}
						/>
					);
				})
				.filter(Boolean)}
		</div>
	);
};

const formatGameDuration = (seconds: number): string => {
	const minutes = Math.floor(seconds / 60);
	const remainingSeconds = seconds % 60;
	return `${minutes}m ${remainingSeconds}s`;
};

const MatchInfo = ({ trophy, playerGameName }: { trophy: Trophy; playerGameName: string }) => (
	<div className="tooltip-match-info">
		<div className="match-info-grid">
			<div className="info-item best-value">
				<span className="info-icon">🏆</span>
				<div className="info-content">
					<span className="info-label">Best Value</span>
					<span className="info-value">{trophy.bestValue}</span>
				</div>
			</div>

			{trophy.bestMatch?.participants && (
				<div className="info-item">
					<span className="info-icon">☠️</span>
					<div className="info-content">
						<span className="info-label">Score</span>
						<span className="info-value">
							{getPlayerScoreFromParticipants(trophy.bestMatch.participants, playerGameName)}
						</span>
					</div>
				</div>
			)}

			{trophy.bestMatch?.queueId !== null && (
				<div className="info-item">
					<span className="info-icon">🎮</span>
					<div className="info-content">
						<span className="info-label">Game Type</span>
						<span className="info-value">{queueTypeTranslations[trophy.bestMatch.queueId]}</span>
					</div>
				</div>
			)}

			{trophy.bestMatch?.gameDuration !== null && (
				<div className="info-item">
					<span className="info-icon">⏱️</span>
					<div className="info-content">
						<span className="info-label">Duration</span>
						<span className="info-value">{formatGameDuration(trophy.bestMatch.gameDuration)}</span>
					</div>
				</div>
			)}
		</div>
	</div>
);

const NoMatchInfo = () => (
	<div className="tooltip-match-info">
		<div className="no-match-container">
			<span className="no-match-icon">❌</span>
			<div className="no-match-content">
				<div className="no-match-title">Not Achieved</div>
				<div className="no-match-subtitle">No match data available</div>
			</div>
		</div>
	</div>
);

function getPlayerScoreFromParticipants(participants: Participant[], playerName: string) {
	const filteredPlayers = participants.filter((p) => p.riotIdGameName === playerName);
	if (filteredPlayers?.length === 0) {
		return '';
	}
	const player = filteredPlayers[0];
	return `${player.kills} / ${player.deaths} / ${player.assists}`;
}

export const TrophyTooltip = (props: TrophyTooltipProps) => {
	if (!props.show) {
		return null;
	}

	const { trophy, x, y, hasMatch } = props;
	const match = trophy.bestMatch;
	const team1 = match?.participants?.filter((p) => p.teamId === 100) || [];
	const team2 = match?.participants?.filter((p) => p.teamId === 200) || [];

	const hasValidTeams = team1.length > 0 && team2.length > 0;

	return (
		<div className="trophy-tooltip-cursor" style={{ left: `${x}px`, top: `${y}px` }}>
			<div className="tooltip-title">{trophy.name}</div>
			<div className="tooltip-description">{trophy.description}</div>

			{hasMatch && match && hasValidTeams ? (
				<>
					<div className="tooltip-match-teams">{renderTeamLayout(team1, team2)}</div>
					<MatchInfo trophy={trophy} playerGameName={props.playerGameName} />
				</>
			) : (
				<NoMatchInfo />
			)}
		</div>
	);
};
