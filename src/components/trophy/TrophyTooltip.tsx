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

export const TrophyTooltip = (props: TrophyTooltipProps) => {
	if (!props.show) {
		return null;
	}

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
			<div className="tooltip-match-info">
				{props.hasMatch ? (
					<>
						<div>Best Value: {props.trophy.bestValue}</div>
						<div>Match Date: {props.matchDate}</div>
						<div>Map: {props.mapId}</div>
						<div>
							Game Duration: {Math.floor((props.gameDuration || 0) / 60)}m{' '}
							{(props.gameDuration || 0) % 60}s
						</div>
					</>
				) : (
					<>
						<div>Best Value: Not achieved yet</div>
						<div>No match data available</div>
					</>
				)}
			</div>
		</div>
	);
};
