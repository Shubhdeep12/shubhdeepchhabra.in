'use client';
import { useState, useEffect } from 'react';

export const useIsMounted = () => {
	const [isMounted, setIsMounted] = useState(false);
	useEffect(() => {
		setIsMounted(true);
	}, []);
	return isMounted;
};
