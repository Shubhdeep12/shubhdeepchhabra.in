'use client'

import cx from 'clsx'

type TextProps = {
	gradient?: boolean
	gFrom?: string
	gTo?: string
	children?: React.ReactNode | string
	className?: string
	active?: boolean
}

const Text = ({
	gradient = false,
	gFrom = 'from-blue-500',
	gTo = 'to-green-500',
	className = '',
	children = '',
	active = false,
}: TextProps) => {
	return (
		<span
			className={cx(
				'p-2',
				'transition-colors',
				'hover:bg-background-button-hover-light dark:hover:bg-background-button-hover-dark',
				gradient && 'hover:text-transparent',
				' bg-gradient-to-r bg-clip-text',
				`${gFrom} ${gTo}`,
				gradient && active && 'text-transparent',
				'rounded',
				className
			)}
		>
			{children}
		</span>
	)
}

export default Text
