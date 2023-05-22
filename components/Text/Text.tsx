'use client'

import cx from 'clsx'

type TextProps = {
	gradient?: boolean
	gFrom?: string
	gTo?: string
	children?: React.ReactNode | string
	className?: string
}

const Text = ({
	gradient = false,
	gFrom = 'from-blue-500',
	gTo = 'to-green-500',
	className = '',
	children = '',
}: TextProps) => {
	return (
		<span
			className={cx(
				'p-2',
				gradient ? 'hocus:text-transparent hocus:bg-gradient-to-r hocus:bg-clip-text' : 'text-blue-50',
				`${gFrom} ${gTo}`,
				className
			)}
		>
			{children}
		</span>
	)
}

export default Text
