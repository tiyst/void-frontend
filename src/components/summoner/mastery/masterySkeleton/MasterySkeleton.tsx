import '../MasteryComponent.scss';
import { MasteryFragmentSkeleton } from '../masteryFragmentSkeleton/MasteryFragmentSkeleton.tsx';
import Base from '../../../../components/base/Base.tsx';

export const MasterySkeleton = () => {
	return (
		<Base className="mastery-component">
			<div className="mastery-component__list">
				<MasteryFragmentSkeleton />
				<MasteryFragmentSkeleton />
				<MasteryFragmentSkeleton />
				<MasteryFragmentSkeleton />
			</div>
		</Base>
	);
};
