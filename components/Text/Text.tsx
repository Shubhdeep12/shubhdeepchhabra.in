'use client'

import { useTheme } from '@/providers/theme-provider'
import cx from 'clsx'

type TextProps = {
	gradient?: boolean
	gFrom?: string
	gTo?: string
	children?: React.ReactNode | string
	className?: string
	active?: boolean
	hoverable?: boolean
	shadow?: boolean
	shadowColor?: string
	transitioned?: boolean
}

const SHADOW_COLOR: { [key: string]: string } = {
	orange: '[text-shadow:0.125rem_0.125rem_0_#fca893]',
	purple: '[text-shadow:0.125rem_0.125rem_0_#bf9cec]',
	yellow: '[text-shadow:0.125rem_0.125rem_0_#fce1a8]',
	blue: '[text-shadow:0.125rem_0.125rem_0_#a7d4f0]',
}

const Text = ({
	gradient = false,
	gFrom = 'from-blue-500',
	gTo = 'to-green-500',
	className = '',
	children = '',
	hoverable = false,
	active = false,
	shadow = false,
	shadowColor = 'yellow',
	transitioned = true,
	...props
}: TextProps) => {
	const { isDark } = useTheme()

	const textClasses = cx(className, 'flex justify-center items-center', 'rounded', {
		'transition-colors': transitioned,
		[`${shadow ? SHADOW_COLOR[shadowColor] : ''}`]: shadow && !isDark,
		'hover:bg-background-button-hover-light dark:hover:bg-background-button-hover-dark': hoverable,
		'hover:text-transparent bg-clip-text': gradient || (shadow && isDark),
		'hover:bg-gradient-to-r': gradient || (shadow && isDark),
		[`${gFrom} ${gTo}`]: gradient || (shadow && isDark),
		'bg-gradient-to-r text-transparent': (gradient && active) || (shadow && isDark),
	})

	return (
		<span className={textClasses} {...props}>
			{children}
		</span>
	)
}

export default Text
