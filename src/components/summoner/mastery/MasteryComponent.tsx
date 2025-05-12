import Base, { BaseBlockProps } from '../../base/Base.tsx';
import { ChampionMastery } from '../../../model/Summoner.ts';
import MasteryFragment from './MasteryFragment.tsx';
import './MasteryComponent.scss';

type MasteryComponentProps = BaseBlockProps & {
	masteries: ChampionMastery[];
};

const MasteryComponent: React.FC<MasteryComponentProps> = (data: MasteryComponentProps) => {
	const { className = '' } = data;

	return (
		<Base className={`mastery-component ${className}`}>
			<div className="mastery-component__list">
				{data.masteries
					.toSorted((a, b) => b.championPoints - a.championPoints)
					.slice(0, 4)
					.map((mastery) => (
						<div className="mastery-component__fragment" key={mastery.lastPlayTime}>
							<MasteryFragment key={mastery.lastPlayTime} {...mastery} />
						</div>
					))}
			</div>
		</Base>
	);
};

export default MasteryComponent;
