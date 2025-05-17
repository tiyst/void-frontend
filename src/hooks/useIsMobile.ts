import { useState, useEffect } from 'react';

export const useIsMobile = (breakpoint = 768) => {
	const [isMobileView, setIsMobileView] = useState(() => {
		if (typeof window !== 'undefined') {
			return window.innerWidth <= breakpoint;
		}
		return false;
	});

	useEffect(() => {
		if (typeof window === 'undefined') {
			return;
		}

		const handleResize = () => {
			setIsMobileView(window.innerWidth <= breakpoint);
		};

		window.addEventListener('resize', handleResize);
		handleResize();

		return () => window.removeEventListener('resize', handleResize);
	}, [breakpoint]);

	return isMobileView;
};