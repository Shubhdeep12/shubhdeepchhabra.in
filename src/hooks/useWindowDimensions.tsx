import { useState, useCallback, useEffect } from 'react';
import { useIsMounted } from './isMounted';

interface WindowDimensions {
	width: number;
	height: number;
}

export const useWindowDimensions = (): WindowDimensions => {
	const mounted = useIsMounted();
	const [dimens, setDimens] = useState<WindowDimensions>({
		width: 0,
		height: 0,
	});

	const handleResize = useCallback(() => {
		if (!mounted) return;
		setDimens({ width: window.innerWidth, height: window.innerHeight });
	}, [mounted]);

	useEffect(() => {
		if (mounted) {
			window.addEventListener('resize', handleResize);
			handleResize();
			return () => window.removeEventListener('resize', handleResize);
		}
		return;
	}, [mounted, handleResize]);

	return dimens;
};
