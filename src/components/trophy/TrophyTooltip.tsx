import { Trophy } from '../../model/Summoner.ts';
import './TrophyTooltip.scss';

export type TrophyTooltipProps = {
	trophy: Trophy;
	x: number;
	y: number;
	show: boolean;
	hasMatch: boolean;
	matchDate?: string;
	mapId?: number;
	gameDuration?: number;
};

const renderTeamLayout = (team1: any[], team2: any[]) => {
	return (
		<div className="tooltip-teams">
			{team1.map((player1, index) => {
				const player2 = team2[index];
				const showVS = index === 2; // Show VS in the middle row
				
				return (
					<div key={index} className="team-row">
						<span className="player-name player-left">{player1.riotIdGameName}</span>
						<div className="tooltip-champion-icon">
							<img 
								src={`https://ddragon.leagueoflegends.com/cdn/14.24.1/img/champion/${player1.championName}.png`}
								alt={player1.championName}
								title={player1.championName}
							/>
						</div>
						<span className="vs-center">
							{showVS ? 'VS' : ''}
						</span>
						<div className="tooltip-champion-icon">
							<img 
								src={`https://ddragon.leagueoflegends.com/cdn/14.24.1/img/champion/${player2.championName}.png`}
								alt={player2.championName}
								title={player2.championName}
							/>
						</div>
						<span className="player-name player-right">{player2.riotIdGameName}</span>
					</div>
				);
			})}
		</div>
	);
};

export const TrophyTooltip = (props: TrophyTooltipProps) => {
	if (!props.show) {
		return null;
	}

	const match = props.trophy.bestMatch;
	const team1 = match?.participants?.filter(p => p.teamId === 100) || [];
	const team2 = match?.participants?.filter(p => p.teamId === 200) || [];

	return (
		<div
			className="trophy-tooltip-cursor"
			style={{
				left: `${props.x}px`,
				top: `${props.y}px`
			}}
		>
			<div className="tooltip-title">{props.trophy.name}</div>
			<div className="tooltip-description">{props.trophy.description}</div>
			
			{props.hasMatch && match ? (
				<>
					<div className="tooltip-match-teams">
						{renderTeamLayout(team1, team2)}
					</div>
					<div className="tooltip-match-info">
						<div>Best Value: {props.trophy.bestValue}</div>
						<div>Match Date: {props.matchDate}</div>
						<div>Game Type: {match.gameMode}</div>
						<div>Map: {props.mapId}</div>
						<div>
							Duration: {Math.floor((props.gameDuration ?? 0) / 60)}m{' '}
							{(props.gameDuration ?? 0) % 60}s
						</div>
					</div>
				</>
			) : (
				<div className="tooltip-match-info">
					<div>Best Value: Not achieved yet</div>
					<div>No match data available</div>
				</div>
			)}
		</div>
	);
};
