import { BaseBlockProps } from '../base/Base.tsx';
import { findPlayerByPuuid, getMapUrlByMapId } from '../../utils/MatchUtils.ts';
import { getChampionIconUrl, getUnknownChampionIconUrl, urlUnknownChampion } from '../../utils/IconsUtils.ts';
import './TrophyComponent.scss';
import { Trophy } from '../../model/Summoner.ts';
import { useState } from 'react';

export type TrophyProms = BaseBlockProps & {
	trophy: Trophy;
	puuid: string;
};

export const TrophyComponent = (data: TrophyProms) => {
	const match = data.trophy.bestMatch ?? null;
	const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0, show: false });

	const handleMouseEnter = () => {
		setTooltipPosition(prev => ({ ...prev, show: true }));
	};

	const handleMouseLeave = () => {
		setTooltipPosition(prev => ({ ...prev, show: false }));
	};

	const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
		setTooltipPosition({
			x: e.clientX - 140, // Center horizontally (140 = half of 280px width)
			y: e.clientY + 20, // 20px below cursor
			show: true
		});
	};

	if (!match) {
		return (
			<div className="trophy-component"
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
				onMouseMove={handleMouseMove}>
				{tooltipPosition.show && (
					<div 
						className="trophy-tooltip-cursor"
						style={{
							left: `${tooltipPosition.x}px`,
							top: `${tooltipPosition.y}px`,
						}}
					>
						<div className="tooltip-title">{data.trophy.name}</div>
						<div className="tooltip-description">{data.trophy.description}</div>
						<div className="tooltip-match-info">
							<div>Best Value: Not achieved yet</div>
							<div>No match data available</div>
						</div>
					</div>
				)}
				<div className="trophy-icon-wrap">
					<img
						src={getUnknownChampionIconUrl()}
						alt="Champion icon"
						draggable={false}
						onError={(e) => {
							(e.target as HTMLImageElement).src = urlUnknownChampion;
						}}
					/>
				</div>
				<div className="trophy-info">
					<div className="trophy-title">{data.trophy.name}</div>
					<div className="trophy-value">??</div>
					<div className="trophy-date">??/??</div>
				</div>
			</div>
		);
	}

	const player = findPlayerByPuuid(match, data.puuid);
	const champIconUrl = getChampionIconUrl(player.championId);
	const date = new Date(match.gameEndTimestamp);

	return (
		<div className="trophy-component"
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
			onMouseMove={handleMouseMove}>
			{tooltipPosition.show && (
				<div 
					className="trophy-tooltip-cursor"
					style={{
						left: `${tooltipPosition.x}px`,
						top: `${tooltipPosition.y}px`,
					}}
				>
					<div className="tooltip-title">{data.trophy.name}</div>
					<div className="tooltip-description">{data.trophy.description}</div>
					<div className="tooltip-match-info">
						<div>Best Value: {data.trophy.bestValue}</div>
						<div>Match Date: {date.toLocaleDateString()}</div>
						<div>Map: {match.mapId}</div>
						<div>Game Duration: {Math.floor(match.gameDuration / 60)}m {match.gameDuration % 60}s</div>
					</div>
				</div>
			)}
			<div className="trophy-icon-wrap">
				<img className="trophy-map-icon" src={getMapUrlByMapId(match.mapId)} alt="Map icon" draggable={false} />
				<img
					src={champIconUrl}
					alt="Champion icon"
					draggable={false}
					onError={(e) => {
						(e.target as HTMLImageElement).src = urlUnknownChampion;
					}}
				/>
			</div>
			<div className="trophy-info">
				<div className="trophy-title">{data.trophy.name}</div>
				<div className="trophy-date">
					{date.toLocaleString('en-US', { month: 'short', day: '2-digit' }).replace(' ', '/')}
				</div>
				<div className="trophy-value">{data.trophy.bestValue}</div>
			</div>
		</div>
	);
};