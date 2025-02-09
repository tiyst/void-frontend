import Base, { BaseBlockProps } from '../../base/Base.tsx';
import './BaseInfo.scss';
import { replaceString } from '../../../utils/StringUtils.ts';
import { Summoner } from '../../../model/Summoner.ts';

const urlIcon = 'https://ddragon.leagueoflegends.com/cdn/15.1.1/img/profileicon/{iconId}.png';


export type BaseInfoProps = BaseBlockProps & {
	summoner: Summoner;
	buttonCallback: () => void;
};

const BaseInfo = (data: BaseInfoProps) => {
	return (
		<Base className={`baseInfo`}>
			<img className="summonerIcon"
				 src={replaceString(urlIcon, 'iconId', String(data.summoner.profileIcon))}
				 alt="Summoner Icon" />
			<h1 className="responsive-text">{data.summoner.gameName}</h1>
			<h2>{data.summoner.tagLine}</h2>
			<h3>{data.summoner.level} level</h3>
			<div className="button-container">
				<button className="update-button" onClick={data.buttonCallback}>Update</button>
			</div>
		</Base>
	);
};

export default BaseInfo;
