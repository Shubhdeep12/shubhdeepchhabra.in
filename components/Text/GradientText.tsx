import cx from 'clsx'
export type GradientTextProps = {
	gFrom?: string
	gTo?: string
	children?: React.ReactNode | string
	className?: string
	active?: boolean
	hoverable?: boolean
	transitioned?: boolean
}

const GradientText = ({
	gFrom = 'from-blue-500',
	gTo = 'to-green-500',
	className = '',
	children = '',
	hoverable = false,
	active = false,
	transitioned = true,
	...props
}: GradientTextProps) => {
	return (
		<span
			className={cx(className, 'flex justify-center items-center', 'rounded', {
				'transition-colors': transitioned,
				'hover:bg-background-button-hover-light dark:hover:bg-background-button-hover-dark': hoverable,
				'hover:text-transparent bg-clip-text': true,
				'hover:bg-gradient-to-r': true,
				[`${gFrom} ${gTo}`]: true,
				'bg-gradient-to-r text-transparent': true && active,
			})}
			{...props}
		>
			{children}
		</span>
	)
}

export default GradientText
