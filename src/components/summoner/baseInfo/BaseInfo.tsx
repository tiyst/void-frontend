import Base, { BaseBlockProps } from '../../base/Base.tsx';
import './BaseInfo.scss';
import { Summoner } from '../../../model/Summoner.ts';
import { getProfileIconUrl } from '../../../utils/IconsUtils.ts';
import { UpdateSummonerSpinner } from '../../../screens/summoner/UpdateSummonerSpinner.tsx';
import { fallbackSummonerSpellIconUrl } from '../../../utils/MatchUtils.ts';

export type BaseInfoProps = BaseBlockProps & {
	summoner: Summoner;
	buttonCallback: () => void;
	isUpdating: boolean;
	countdown: number;
};

const BaseInfo = (data: BaseInfoProps) => {
	const buttonStatus = (countdown: number): string => {
		return countdown == 0 ? 'Update' : `Wait ${data.countdown}s`;
	};

	return (
		<Base className="baseInfo">
			<div className="baseInfo__top-row">
				<div className="baseInfo__icon-container">
					<img
						className="baseInfo__icon"
						src={getProfileIconUrl(data.summoner.profileIcon)}
						alt="Summoner Icon"
						onError={(e) => {
							(e.target as HTMLImageElement).src = fallbackSummonerSpellIconUrl;
						}}
					/>
				</div>
				<div className="baseInfo__info-block">
					<div className="baseInfo__name">
						{data.summoner.gameName}
						<span className="baseInfo__tagline">#{data.summoner.tagLine}</span>
					</div>
					<div className="baseInfo__level">Level {data.summoner.level}</div>
				</div>
			</div>
			<button
				className="baseInfo__update-button"
				onClick={data.buttonCallback}
				disabled={data.countdown > 0}
			>
				{data.isUpdating ? <UpdateSummonerSpinner /> : buttonStatus(data.countdown)}
			</button>
		</Base>
	);
};

export default BaseInfo;
