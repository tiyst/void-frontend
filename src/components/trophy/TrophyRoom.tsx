import Base, { BaseBlockProps } from '../base/Base.tsx';
import { TrophyComponent } from './TrophyComponent.tsx';
import { Trophy } from '../../model/Summoner.ts';
import './TrophyRoom.scss';
import { useEffect, useRef, useState } from 'react';

export type TrophyRoomProps = BaseBlockProps & {
	trophies: Trophy[];
	puuid: string;
};

// TODO refactor
export const TrophyRoom = (data: TrophyRoomProps) => {
	const { className = '' } = data;
	const [containerWidth, setContainerWidth] = useState<number>(0);
	const [showLeftArrow, setShowLeftArrow] = useState(false);
	const [showRightArrow, setShowRightArrow] = useState(false);
	const scrollContainerRef = useRef<HTMLDivElement>(null);
	const trophyRoomRef = useRef<HTMLDivElement>(null);

	const isDragging = useRef(false);
	const startX = useRef(0);
	const scrollLeft = useRef(0);

	const checkArrows = () => {
		if (!scrollContainerRef.current) return;
		const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
		setShowLeftArrow(scrollLeft > 0);
		setShowRightArrow(scrollLeft + clientWidth < scrollWidth - 1);
	};

	const onMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
		if (!scrollContainerRef.current) return;
		isDragging.current = true;
		startX.current = e.pageX - scrollContainerRef.current.offsetLeft;
		scrollLeft.current = scrollContainerRef.current.scrollLeft;
		document.body.style.cursor = 'grabbing';
		document.body.style.userSelect = 'none';

		const onMouseMove = (moveEvent: MouseEvent) => {
			if (!isDragging.current || !scrollContainerRef.current) return;
			const x = moveEvent.pageX - scrollContainerRef.current.offsetLeft;
			const walk = x - startX.current;
			scrollContainerRef.current.scrollLeft = scrollLeft.current - walk;
		};

		const onMouseUp = () => {
			isDragging.current = false;
			document.body.style.cursor = '';
			document.body.style.userSelect = '';
			window.removeEventListener('mousemove', onMouseMove);
			window.removeEventListener('mouseup', onMouseUp);
		};

		window.addEventListener('mousemove', onMouseMove);
		window.addEventListener('mouseup', onMouseUp);
	};

	useEffect(() => {
		checkArrows();
	}, [containerWidth, data.trophies]);

	useEffect(() => {
		const container = scrollContainerRef.current;
		if (!container) return;
		container.addEventListener('scroll', checkArrows);
		return () => container.removeEventListener('scroll', checkArrows);
	}, []);

	useEffect(() => {
		const container = trophyRoomRef.current;
		if (!container) return;

		const cards = Array.from(container.children) as HTMLElement[];
		const rowWidths = [0, 0];

		cards.forEach((card, i) => {
			const width = card.getBoundingClientRect().width;
			const row = i % 2;
			rowWidths[row] += width + 6; // horizontal gap
		});

		setContainerWidth(Math.max(...rowWidths));
	}, [data.trophies]);

	const scrollByAmount = 200;

	const scrollLeftFunc = () => {
		if (scrollContainerRef.current) {
			scrollContainerRef.current.scrollBy({ left: -scrollByAmount, behavior: 'smooth' });
		}
	};

	const scrollRightFunc = () => {
		if (scrollContainerRef.current) {
			scrollContainerRef.current.scrollBy({ left: scrollByAmount, behavior: 'smooth' });
		}
	};

	return (
		<Base className={`trophy-base ${className}`}>
			{showLeftArrow && (
				<button className="arrow-btn arrow-left" onClick={scrollLeftFunc} tabIndex={-1}>
					<svg width="32" height="40" viewBox="0 0 32 40" fill="none">
						<polyline
							points="20,4 8,20 20,36"
							stroke="#b57aff"
							strokeWidth="3"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
					</svg>
				</button>
			)}
			{showRightArrow && (
				<button className="arrow-btn arrow-right" onClick={scrollRightFunc} tabIndex={-1}>
					<svg width="32" height="40" viewBox="0 0 32 40" fill="none">
						<polyline
							points="12,4 24,20 12,36"
							stroke="#b57aff"
							strokeWidth="3"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
					</svg>
				</button>
			)}
			<div className="trophy-room-container" ref={scrollContainerRef}>
				<div
					className="trophy-room"
					style={{ width: containerWidth ? `${containerWidth}px` : undefined }}
					onMouseDown={onMouseDown}
					ref={trophyRoomRef}
				>
					{data?.trophies?.map((trophy: Trophy) => {
						return <TrophyComponent trophy={trophy} puuid={data.puuid} key={trophy.name} />;
					})}
				</div>
			</div>
		</Base>
	);
};
