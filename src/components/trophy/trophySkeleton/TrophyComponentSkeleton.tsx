
import '../TrophyComponent.scss';
import { Skeleton } from '../../base/skeleton/Skeleton.tsx';

export const TrophyComponentSkeleton = ({ width }: { width?: string }) => {
    return (
        <div className='trophy-component' style={{ flex: 'none', width: width ? Math.max(220, parseInt(width.replace('px', ''))) + 'px' : '220px' }}>
            <div className='trophy-icon-wrap'>
                <Skeleton className='trophy-skeleton__icon' />
            </div>
            <div className='trophy-info'>
                <Skeleton className='trophy-skeleton__title' />
                <Skeleton className='trophy-skeleton__value' />
                <Skeleton className='trophy-skeleton__date' />
            </div>
        </div>
    );
};
