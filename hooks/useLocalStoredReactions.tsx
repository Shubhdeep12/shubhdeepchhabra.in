'use client'
import { useEffect, useState } from 'react'
import { useIsMounted } from './isMounted'

const useLocalStoredReactions = (key: string, initialValue: Record<string, boolean>) => {
	const isMounted = useIsMounted()

	const [localReactions, setLocalReactions] = useState(initialValue)

	useEffect(() => {
		if (window !== undefined) {
			if (window.localStorage.getItem(key)) setLocalReactions(JSON.parse(window.localStorage.getItem(key) || ''))
			else setLocalReactions({})
		}
	}, [isMounted, key])

	const setLocalStoredReactions = (type: string) => {
		if (window !== undefined) {
			window.localStorage.setItem(key, JSON.stringify({ ...localReactions, [type]: true }))
		}
		setLocalReactions((prev) => ({ ...prev, [type]: true }))
	}

	return { localReactions, setLocalStoredReactions }
}

export default useLocalStoredReactions
