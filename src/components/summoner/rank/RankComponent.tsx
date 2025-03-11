import { Rank } from '../../../model/Summoner.ts';
import BaseWithHeader from '../../base/withHeader/BaseWithHeader.tsx';
import RankFragment from './RankFragment.tsx';
import { BaseBlockProps } from '../../base/Base.tsx';
import './RankComponent.scss';

type RankComponentProps = BaseBlockProps & {
	ranks: Rank[];
};

const RankComponent: React.FC<RankComponentProps> = (data: RankComponentProps) => {
	const { className = '' } = data;

	return (
		<BaseWithHeader headerText="Ranks" className={`rankComponent ${className}`}>
			{RankFragment('Ranked Solo', data.ranks[0])}
			{RankFragment('Ranked Flex', data.ranks[1])}
		</BaseWithHeader>
	);
};

export default RankComponent;
