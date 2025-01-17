import Base, { BaseBlockProps } from '../../base/Base.tsx';
import './BaseInfo.scss';

type BaseInfoProps = BaseBlockProps & {
	summonerName?: string;
	summonerIconUrl?: string;
	level?: string;
};

const BaseInfo: React.FC<BaseInfoProps> = ({ summonerName, summonerIconUrl, level, children, className = '' }) => {
	return (
		<Base className={`baseInfo ${className}`}>
			{summonerIconUrl && <img className="summonerIcon" src={summonerIconUrl} alt="Summoner Icon" />}
			{summonerName && <h2 className="summonerName">{summonerName}</h2>}
			{level && <h3 className="level">{level}</h3>}
			{children}
		</Base>
	);
};

export default BaseInfo;
