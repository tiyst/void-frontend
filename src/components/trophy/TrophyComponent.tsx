import { BaseBlockProps } from '../base/Base.tsx';
import { findPlayerByPuuid, getMapUrlByMapId } from '../../utils/MatchUtils.ts';
import { getChampionIconUrl, getUnknownChampionIconUrl, urlUnknownChampion } from '../../utils/IconsUtils.ts';
import './TrophyComponent.scss';
import { Trophy } from '../../model/Summoner.ts';
import { useState } from 'react';
import { TrophyTooltip } from './TrophyTooltip.tsx';
import { useIsMobile } from '../../hooks/useIsMobile.ts';

export type TrophyProms = BaseBlockProps & {
	trophy: Trophy;
	puuid: string;
};

export const TrophyComponent = (data: TrophyProms) => {
	const match = data.trophy.bestMatch ?? null;
	const isMobile = useIsMobile();
	const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0, show: false });

	const handleMouseEnter = () => {
		if (isMobile) return;
		setTooltipPosition((prev) => ({ ...prev, show: true }));
	};

	const handleMouseLeave = () => {
		if (isMobile) return;
		setTooltipPosition((prev) => ({ ...prev, show: false }));
	};

	const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
		if (isMobile) return;
		setTooltipPosition({
			x: e.clientX,
			y: e.clientY + 20, // 20px below cursor
			show: true
		});
	};

	if (!match) {
		return (
			<div
				className="trophy-component"
				{...(isMobile ? {} : {
					onMouseEnter: handleMouseEnter,
					onMouseLeave: handleMouseLeave,
					onMouseMove: handleMouseMove
				})}
			>
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
				{!isMobile && (
					<TrophyTooltip
						trophy={data.trophy}
						x={tooltipPosition.x}
						y={tooltipPosition.y}
						show={tooltipPosition.show}
						hasMatch={false}
					/>
				)}
			</div>
		);
	}

	const player = findPlayerByPuuid(match, data.puuid);
	const champIconUrl = getChampionIconUrl(player.championId);
	const date = new Date(match.gameEndTimestamp);

	return (
		<div
			className="trophy-component"
			{...(isMobile ? {} : {
				onMouseEnter: handleMouseEnter,
				onMouseLeave: handleMouseLeave,
				onMouseMove: handleMouseMove
			})}
		>
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
			{!isMobile && (
				<TrophyTooltip
					trophy={data.trophy}
					x={tooltipPosition.x}
					y={tooltipPosition.y}
					show={tooltipPosition.show}
					hasMatch={true}
					matchDate={date.toLocaleDateString()}
					mapId={match.mapId}
					gameDuration={match.gameDuration}
				/>
			)}
		</div>
	);
};
