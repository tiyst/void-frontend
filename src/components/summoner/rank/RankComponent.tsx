import { Rank } from '../../../model/Summoner.ts';
import RankFragment from './RankFragment.tsx';
import Base, { BaseBlockProps } from '../../base/Base.tsx';
import './RankComponent.scss';

type RankComponentProps = BaseBlockProps & {
	ranks: Rank[];
};

const RankComponent: React.FC<RankComponentProps> = (data: RankComponentProps) => {
	const { className = '' } = data;

	return (
		<Base className={`rank-component ${className}`}>
			<div className="rank-component__fragment">
				{RankFragment('Ranked Solo', data.ranks[0])}
			</div>
			<div className="rank-component__divider" />
			<div className="rank-component__fragment">
				{RankFragment('Ranked Flex', data.ranks[1])}
			</div>
		</Base>
	);
};

export default RankComponent;
