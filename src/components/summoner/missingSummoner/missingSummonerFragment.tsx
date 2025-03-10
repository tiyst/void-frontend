import './missingSummonerFragment.scss';
import Base, { BaseBlockProps } from '../../base/Base.tsx';
import { getProfileIconUrl } from '../../../utils/IconsUtils.ts';

export type MissingSummonerProps = BaseBlockProps & {
	gameName: string;
	tagLine: string;
	buttonCallback: () => void;
};

export const MissingSummonerFragment = (data: MissingSummonerProps) => {

	return (
		<Base className={`baseInfo missingSummoner`}>
			<img className="summonerIcon"
				 src={getProfileIconUrl(29)}
				 alt="Summoner Icon" />
			<h1>Summoner <i>{data.gameName}#{data.tagLine}</i> not found</h1>
			<h2>Please press the update button</h2>
			<div className="button-container">
				<button className="update-button" onClick={data.buttonCallback}>Update</button>
			</div>
		</Base>
	);
};