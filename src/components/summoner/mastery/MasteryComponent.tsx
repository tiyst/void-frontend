import { BaseBlockProps } from '../../base/Base.tsx';
import { ChampionMastery } from '../../../model/Summoner.ts';
import BaseWithHeader from '../../base/withHeader/BaseWithHeader.tsx';
import MasteryFragment from './MasteryFragment.tsx';
import './MasteryComponent.scss';

type MasteryComponentProps = BaseBlockProps & {
	masteries: ChampionMastery[];
};

const MasteryComponent: React.FC<MasteryComponentProps> = (data: MasteryComponentProps) => {
	const { className = '' } = data;

	return (
		<BaseWithHeader headerText="Masteries" className={`masteryComponent ${className}`}>
			{data.masteries.slice(0,4).map((mastery) => (
				<MasteryFragment key={mastery.id} {...mastery} />
			))}
		</BaseWithHeader>
	);
};

export default MasteryComponent;
