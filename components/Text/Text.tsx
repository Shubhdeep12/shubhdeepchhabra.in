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

	const SHADOW_COLOR: { [key: string]: string } = {
		orange: '[text-shadow:0.125rem_0.125rem_0_#fca893]',
		purple: '[text-shadow:0.125rem_0.125rem_0_#bf9cec]',
		yellow: '[text-shadow:0.125rem_0.125rem_0_#fce1a8]',
		blue: '[text-shadow:0.125rem_0.125rem_0_#a7d4f0]',
	}

	return (
		<span
			className={cx(
				className,
				'flex justify-center items-center',
				transitioned && 'transition-colors',
				'rounded',
				shadow && !isDark && `${SHADOW_COLOR[shadowColor]}`,
				hoverable && 'hover:bg-background-button-hover-light dark:hover:bg-background-button-hover-dark',
				gradient && 'hover:text-transparent bg-clip-text',
				gradient && 'hover:bg-gradient-to-r',
				gradient && `${gFrom} ${gTo}`,
				gradient && active && 'bg-gradient-to-r text-transparent'
			)}
			{...props}
		>
			{children}
		</span>
	)
}

export default Text
