'use client';
import { useEffect, useState } from 'react';
import { useIsMounted } from './isMounted';
import { useBlogReactions } from './useBlogReactions';

const useLocalStoredReactions = (key: string, initialValue: Record<string, boolean>) => {
	const isMounted = useIsMounted();
	const { userSession } = useBlogReactions(key);

	const [localReactions, setLocalReactions] = useState<Record<string, boolean>>(initialValue);

	useEffect(() => {
		if (window !== undefined) {
			if (window.localStorage.getItem(key)) setLocalReactions(JSON.parse(window.localStorage.getItem(key) || ''));
			else setLocalReactions({});
		}
	}, [isMounted, key]);

	useEffect(() => {
		if (isMounted && userSession?.isLiked !== null) {
			setLocalReactions({
				like: userSession?.isLiked,
				love: userSession?.isLoved,
				bookmark: userSession?.isBookmarked,
			});
		} else setLocalReactions({});
	}, [userSession, isMounted]);

	const setLocalStoredReactions = (type: string) => {
		if (window !== undefined) {
			window.localStorage.setItem(key, JSON.stringify({ ...localReactions, [type]: true }));
		}
		setLocalReactions((prev) => ({ ...prev, [type]: true }));
	};

	return { localReactions, setLocalStoredReactions };
};

export default useLocalStoredReactions;
