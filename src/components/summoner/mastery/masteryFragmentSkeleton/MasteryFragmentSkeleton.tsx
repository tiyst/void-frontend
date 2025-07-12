import '../MasteryFragment.scss';
import { Skeleton } from '../../../base/skeleton/Skeleton.tsx';

export const MasteryFragmentSkeleton = () => {
	return (
		<div className="masteryFragment">
			<Skeleton className="splashBckg" />
			<div className="textDiv">
				<Skeleton className="mastery-skeleton__level-placeholder" />
				<Skeleton className="mastery-skeleton__points-placeholder" />
			</div>
		</div>
	);
};
