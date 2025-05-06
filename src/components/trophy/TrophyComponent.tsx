import { BaseBlockProps } from '../base/Base.tsx';
import {
	findPlayerByPuuid,
	getMapUrlByMapId,
} from '../../utils/MatchUtils.ts';
import { getChampionIconUrl, getUnknownChampionIconUrl, urlUnknownChampion } from '../../utils/IconsUtils.ts';
import './TrophyComponent.scss';
import { Trophy } from '../../model/Summoner.ts';

export type TrophyProms = BaseBlockProps & {
	trophy: Trophy;
	puuid: string;
};

export const TrophyComponent = (data: TrophyProms) => {
	const match = data.trophy.bestMatch ?? null;

	if (!match) {
		return (
			<div className="trophy-component">
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
		<div className="trophy-component">
			<div className="trophy-icon-wrap">
				<img
					className="trophy-map-icon"
					src={getMapUrlByMapId(match.mapId)}

					alt="Map icon"
					draggable={false}
				/>
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
