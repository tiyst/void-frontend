
import '../TrophyRoom.scss';
import { TrophyComponentSkeleton } from './TrophyComponentSkeleton.tsx';
import Base from '../../base/Base.tsx';

export const TrophyRoomSkeleton = () => {
    return (
        <Base className='trophy-base'>
            <div className='trophy-room-container'>
                <div className='trophy-room'>
                    <TrophyComponentSkeleton width={`${Math.floor(Math.random() * (250 - 180 + 1)) + 180}px`} />
                    <TrophyComponentSkeleton width={`${Math.floor(Math.random() * (250 - 180 + 1)) + 180}px`} />
                    <TrophyComponentSkeleton width={`${Math.floor(Math.random() * (250 - 180 + 1)) + 180}px`} />
                    <TrophyComponentSkeleton width={`${Math.floor(Math.random() * (250 - 180 + 1)) + 180}px`} />
                    <TrophyComponentSkeleton width={`${Math.floor(Math.random() * (250 - 180 + 1)) + 180}px`} />
                    <TrophyComponentSkeleton width={`${Math.floor(Math.random() * (250 - 180 + 1)) + 180}px`} />
                </div>
            </div>
        </Base>
    );
};
