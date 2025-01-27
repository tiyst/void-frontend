import Base from '../../base/Base.tsx';
import './BaseInfo.scss';
import { replaceString } from '../../../utils/StringUtils.ts';
import { Summoner } from '../../../model/Summoner.ts';

const urlIcon = 'https://ddragon.leagueoflegends.com/cdn/15.1.1/img/profileicon/{iconId}.png';


const BaseInfo = (summoner: Summoner) => {
	return (
		<Base className={`baseInfo`}>
			<img className="summonerIcon"
				 src={replaceString(urlIcon, 'iconId', String(summoner.profileIcon))}
				 alt="Summoner Icon" />
			<h1>{summoner.gameName}</h1>
			<h2>{summoner.tagLine}</h2>
			<h3>{summoner.level} level</h3>
		</Base>
	);
};

export default BaseInfo;
