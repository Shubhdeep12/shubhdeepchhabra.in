'use client'

import { ChevronUp } from '@/Icons'
import { useIsMounted } from '@/hooks/isMounted'
import { useState, useEffect, useCallback } from 'react'
import Button from '@/ui/Button'
import Text from '@/ui/Text'
import clsx from 'clsx'
import { useTheme } from '@/providers/theme-provider'

export const scrollToTop = () => {
	try {
		window.scroll({
			top: 0,
			left: 0,
			behavior: 'smooth',
		})
	} catch (error) {
		window.scrollTo(0, 0)
	}
}

const SCROLL_OFFSET = 287
export const BackToTop = () => {
	const { isDark } = useTheme()
	const [showButton, setShowButton] = useState(false)
	const isMounted = useIsMounted()

	const checkScrollTop = useCallback(() => {
		if (!isMounted) return
		const scrolledDistance = window.scrollY || window.pageYOffset
		const screenHeight = document.body.scrollHeight - window.screen.availHeight
		try {
			setShowButton(
				scrolledDistance / screenHeight > 0.25 && scrolledDistance < screenHeight - Math.ceil(SCROLL_OFFSET / 2.5)
			)
		} catch (e) {
			/* empty */
		}
	}, [isMounted])

	useEffect(() => {
		if (!isMounted) return
		window.addEventListener('scroll', checkScrollTop)
		checkScrollTop()
		// eslint-disable-next-line consistent-return
		return () => {
			window.removeEventListener('scroll', checkScrollTop)
		}
	}, [isMounted, checkScrollTop])

	return (
		<Button
			onClick={scrollToTop}
			focusOutlined
			hoverable={false}
			className={clsx(
				'g-blue-700 hover:-translate-y-[1px] bg-blue-800 hover:shadow-md dark:bg-blue-500 dark:hover:bg-blue-400',
				'flex z-[2] fixed right-0 bottom-0 m-16 p-4 rounded-full h-[50] w-[50] gap-0',
				`${showButton ? 'visible' : 'invisible'}`,
				`${showButton ? 'pointer-events-auto' : 'pointer-events-none'}`,
				`${showButton ? 'select-auto' : 'select-none'}`,
				`${showButton ? 'opacity-1' : 'opacity-0'}`,
				`transform`,
				`${showButton ? 'translate-y-0' : 'translate-y-[72px]'}`
			)}
		>
			<ChevronUp color={isDark ? '#000' : '#fff'} className='block visible laptop:hidden laptop:invisible' />
			<Text
				transitioned={false}
				className='hidden laptop:flex h-full text-white dark:text-text-dark font-extrabold dark:font-bold p-0'
			>
				BACK TO TOP
			</Text>
		</Button>
	)
}
