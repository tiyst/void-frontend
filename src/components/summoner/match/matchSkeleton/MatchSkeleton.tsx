import '../MatchComponent.scss';
import { Skeleton } from '../../../base/skeleton/Skeleton.tsx';
import Base from '../../../../components/base/Base.tsx';

export const MatchSkeleton = () => {
	return (
		<Base className="match-modern">
			<div className="match-left">
				<div className="match-left__row">
					<div className="match-left__icon-wrapper">
						<Skeleton className="match-left__champion" />
					</div>
					<div className="match-left__stats match-skeleton__stats-override">
						<Skeleton className="match-skeleton__kda-placeholder" />
						<Skeleton className="match-skeleton__cs-time-placeholder" />
					</div>
				</div>
				<div className="match-left__second-row">
					<Skeleton className="match-skeleton__match-details-placeholder" />
					<div className="match-left__footer">
						<Skeleton className="match-skeleton__result-placeholder" />
						<Skeleton className="match-skeleton__ago-placeholder" />
					</div>
				</div>
			</div>
			<div className="match__center">
				<div className="center-icons">
					<div className="icon-row">
						<Skeleton className="center-icon" />
						<Skeleton className="center-icon" />
					</div>
					<div className="icon-row">
						<Skeleton className="center-icon" />
						<Skeleton className="center-icon" />
					</div>
				</div>
				<div className="center-extra-stats">
					<Skeleton className="match-skeleton__vision-score-placeholder" />
					<Skeleton className="match-skeleton__kill-participation-placeholder" />
					<Skeleton className="match-skeleton__multikill-badge-placeholder" />
				</div>
			</div>
			<div className="match__right">
				<div className="items">
					<Skeleton width="28px" height="28px" borderRadius="6px" />
					<Skeleton width="28px" height="28px" borderRadius="6px" />
					<Skeleton width="28px" height="28px" borderRadius="6px" />
					<Skeleton width="28px" height="28px" borderRadius="6px" />
					<Skeleton width="28px" height="28px" borderRadius="6px" />
					<Skeleton width="28px" height="28px" borderRadius="6px" />
				</div>
				<div className="teams">
					<div className="team-row">
						<Skeleton width="20px" height="20px" borderRadius="50%" />
						<Skeleton width="20px" height="20px" borderRadius="50%" />
						<Skeleton width="20px" height="20px" borderRadius="50%" />
						<Skeleton width="20px" height="20px" borderRadius="50%" />
						<Skeleton width="20px" height="20px" borderRadius="50%" />
					</div>
					<div className="team-row">
						<Skeleton width="20px" height="20px" borderRadius="50%" />
						<Skeleton width="20px" height="20px" borderRadius="50%" />
						<Skeleton width="20px" height="20px" borderRadius="50%" />
						<Skeleton width="20px" height="20px" borderRadius="50%" />
						<Skeleton width="20px" height="20px" borderRadius="50%" />
					</div>
				</div>
			</div>
		</Base>
	);
};
