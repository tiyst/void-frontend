import Base, { BaseBlockProps } from '../../base/Base.tsx';
import './BaseInfo.scss';
import { Summoner } from '../../../model/Summoner.ts';
import { getProfileIconUrl } from '../../../utils/IconsUtils.ts';

export type BaseInfoProps = BaseBlockProps & {
	summoner: Summoner;
	buttonCallback: () => void;
	countdown: number;
};

const BaseInfo = (data: BaseInfoProps) => {
	return (
		<Base className={`baseInfo`}>
			<img className="summonerIcon"
				 src={getProfileIconUrl(data.summoner.profileIcon)}
				 alt="Summoner Icon" />
			<h1 className="responsive-text">{data.summoner.gameName}</h1>
			<h2>{data.summoner.tagLine}</h2>
			<h3>{data.summoner.level} level</h3>
			<div className="button-container">
				<button className="update-button" onClick={data.buttonCallback} disabled={ data.countdown > 0 } >
					{data.countdown == 0
						? "Update"
						: `Wait ${data.countdown}s`
					}
				</button>
			</div>
		</Base>
	);
};

export default BaseInfo;
