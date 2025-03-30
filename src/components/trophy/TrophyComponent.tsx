import { BaseBlockProps } from '../base/Base.tsx';
import {
	calculateKDA,
	calculateKdaColor,
	findPlayerByPuuid,
	getMapUrlByMapId,
	unixDurationToMinutes
} from '../../utils/MatchUtils.ts';
import { getChampionIconUrl, getUnknownChampionIconUrl, urlUnknownChampion } from '../../utils/IconsUtils.ts';
import { getRoleIconUrl } from '../../utils/RoleUtils.ts';
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
				<div className="trophy-title-container">
					<h4 className="trophy-title-text">{data.trophy.name}</h4>
				</div>
				<div className="trophy-image-container">
					<img
						src={getUnknownChampionIconUrl()}
						alt="Champion icon"
						onError={(e) => {
							(e.target as HTMLImageElement).src = urlUnknownChampion;
						}}
					/>
				</div>
				<div>
					<h2>??</h2>
				</div>
				<div className="trophy-player-stats">
					<h3>
						<span>?</span>/<span style={{ color: '#F47174' }}>?</span>/<span>?</span>
						{' • '}
						<span style={{ fontWeight: 'bold', color: '#ffffff' }}>?</span> KDA
					</h3>
					<h4></h4>
					<h4>{`?CS  • (? CSPM)`}</h4>
				</div>
				<div>???/??</div>
			</div>
		);
	}

	const player = findPlayerByPuuid(match, data.puuid);
	const kda = calculateKDA(player.kills, player.deaths, player.assists);
	const champIconUrl = getChampionIconUrl(player.championId);
	const date = new Date(match.gameEndTimestamp);

	return (
		<div className="trophy-component">
			<div className="trophy-title-container">
				<h4 className="trophy-title-text">{data.trophy.name}</h4>
			</div>
			<div className="trophy-image-container">
				<img src={getMapUrlByMapId(match.mapId)} className="trophy-map-image" alt="Map icon" />
				<img
					src={champIconUrl}
					alt="Champion icon"
					onError={(e) => {
						(e.target as HTMLImageElement).src = urlUnknownChampion;
					}}
				/>
				<div className="trophy-level-badge">{player.champLevel}</div>
				{player.teamPosition !== '' && (
					<img src={getRoleIconUrl(player.teamPosition)} alt="Role Icon" className="role-image" />
				)}
			</div>
			<div>
				<h2>{data.trophy.bestValue}</h2>
			</div>
			<div className="trophy-player-stats">
				<h3>
					<span>{player.kills}</span>/<span style={{ color: '#F47174' }}>{player.deaths}</span>/
					<span>{player.assists}</span>
					{' • '}
					<span style={{ fontWeight: 'bold', color: calculateKdaColor(kda) }}>{kda}</span> KDA
				</h3>
				<h4></h4>
				<h4>{`${player.totalMinionsKilled}CS  • (${(player.totalMinionsKilled / unixDurationToMinutes(data.trophy.bestMatch.gameDuration)).toFixed(1)} CSPM)`}</h4>
			</div>
			<div>{date.toLocaleString('en-US', { month: 'short', day: '2-digit' }).replace(' ', '/')}</div>
		</div>
	);
};
