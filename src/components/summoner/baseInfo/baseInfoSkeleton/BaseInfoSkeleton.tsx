import Base from '../../../../components/base/Base.tsx';
import '../BaseInfo.scss';
import { Skeleton } from '../../../base/skeleton/Skeleton.tsx';

export const BaseInfoSkeleton = () => {
	return (
		<Base className="baseInfo">
			<div className="baseInfo__top-row">
				<div className="baseInfo__icon-container">
					<Skeleton
						className="baseInfo__icon"
						width="80px"
						height="80px"
						borderRadius="50%"
						backgroundColor="#221a2e"
						border="3px solid #6c4fbb"
					/>
				</div>
				<div className="baseInfo__info-block">
					<div className="baseInfo__name" style={{ display: 'flex', alignItems: 'center' }}>
						<Skeleton style={{ width: '120px', height: '24px' }} />
					</div>
					<div className="baseInfo__level">
						<Skeleton style={{ width: '60px', height: '20px' }} />
					</div>
				</div>
			</div>
			<div style={{ display: 'flex', justifyContent: 'center' }}>
				<Skeleton
					className="baseInfo__update-button"
					border="$accent-violet"
					height="28px"
					borderRadius="16px"
				/>
			</div>
		</Base>
	);
};
