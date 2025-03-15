import Base, { BaseBlockProps } from '../../base/Base.tsx';
import './BaseInfo.scss';
import { Summoner } from '../../../model/Summoner.ts';
import { getProfileIconUrl } from '../../../utils/IconsUtils.ts';
import { UpdateSummonerSpinner } from '../../../screens/summoner/UpdateSummonerSpinner.tsx';

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
		<Base className={`baseInfo`}>
			<img className="summonerIcon" src={getProfileIconUrl(data.summoner.profileIcon)} alt="Summoner Icon" />
			<h1 className="responsive-text">{data.summoner.gameName}</h1>
			<h2>{data.summoner.tagLine}</h2>
			<h3>{data.summoner.level} level</h3>
			<div className="button-container">
				<button className="update-button" onClick={data.buttonCallback} disabled={data.countdown > 0}>
					{data.isUpdating ? <UpdateSummonerSpinner /> : buttonStatus(data.countdown)}
				</button>
			</div>
		</Base>
	);
};

export default BaseInfo;
