import Base, { BaseBlockProps } from '../base/Base.tsx';
import { TrophyComponent } from './TrophyComponent.tsx';
import { Trophy } from '../../model/Summoner.ts';
import './TrophyRoom.scss';
import { useRef } from 'react';

export type TrophyRoomProps = BaseBlockProps & {
	trophies: Trophy[];
	puuid: string;
};

export const TrophyRoom = (data: TrophyRoomProps) => {
	const { className = '' } = data;

	const scrollContainerRef = useRef<HTMLDivElement>(null);

	const handleScroll = (direction: 'left' | 'right') => {
		if (scrollContainerRef.current) {
			const scrollAmount = 205;
			if (direction === 'right') {
				scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
			} else {
				scrollContainerRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
			}
		}
	};
	return (
		<Base className={`trophy-room-container ${className}`}>
			<div className="arrow-btn arrow-left" onClick={() => handleScroll('left')}>
				{'<'}
			</div>
			<div className="trophy-room" ref={scrollContainerRef}>
				{data?.trophies?.map((trophy: Trophy) => {
					return <TrophyComponent trophy={trophy} puuid={data.puuid} />;
				})}
			</div>
			<div className="arrow-btn arrow-right" onClick={() => handleScroll('right')}>
				{'>'}
			</div>
		</Base>
	);
};
