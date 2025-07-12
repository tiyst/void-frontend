import '../RankComponent.scss';
import { Skeleton } from '../../../base/skeleton/Skeleton.tsx';
import Base from '../../../../components/base/Base.tsx';

export const RankSkeleton = () => {
    return (
        <Base className='rank-component'>
            <div className='rank-component__fragment'>
                <div className='rank-fragment'>
                    <Skeleton className='rank-fragment__icon' width='64px' height='64px' />
                    <div className='rank-fragment__text'>
                        <Skeleton className='rank-skeleton__queue-placeholder' style={{ width: '100px', height: '20px' }} />
                        <Skeleton className='rank-skeleton__tier-placeholder' style={{ width: '150px', height: '15px' }} />
                        <Skeleton className='rank-skeleton__wr-placeholder' style={{ width: '120px', height: '15px' }} />
                    </div>
                </div>
            </div>
            <div className='rank-component__divider' />
            <div className='rank-component__fragment'>
                <div className='rank-fragment'>
                    <Skeleton className='rank-fragment__icon' width='64px' height='64px' />
                    <div className='rank-fragment__text'>
                        <Skeleton className='rank-skeleton__queue-placeholder' style={{ width: '100px', height: '20px' }} />
                        <Skeleton className='rank-skeleton__tier-placeholder' style={{ width: '150px', height: '15px' }} />
                        <Skeleton className='rank-skeleton__wr-placeholder' style={{ width: '120px', height: '15px' }} />
                    </div>
                </div>
            </div>
        </Base>
    );
};