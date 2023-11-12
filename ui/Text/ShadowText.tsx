import clsx from 'clsx'
export type ShadowTextProps = {
	shadowColor?: string
	gFrom?: string
	gTo?: string
	children?: React.ReactNode | string
	className?: string
	as?: string | React.ElementType
	[x: string | number | symbol]: unknown
}

const SHADOW_COLOR: { [key: string]: string } = {
	orange: '[text-shadow:0.125rem_0.125rem_0_#fca893]',
	purple: '[text-shadow:0.125rem_0.125rem_0_#bf9cec]',
	yellow: '[text-shadow:0.125rem_0.125rem_0_#fce1a8]',
	blue: '[text-shadow:0.125rem_0.125rem_0_#a7d4f0]',
}

const ShadowText = ({
	shadowColor = 'purple',
	gFrom = '',
	gTo = '',
	className = '',
	children = '',
	as = 'span',
	...props
}: ShadowTextProps) => {
	const Component = as
	return (
		<Component
			className={clsx(
				className,
				'flex justify-center items-center',
				'rounded',
				'transition-colors',
				[`${SHADOW_COLOR[shadowColor]}`],
				'dark:[text-shadow:none]',
				{
					'dark:bg-gradient-to-tr dark:text-transparent dark:bg-clip-text': gFrom.length > 0,
					[`${gFrom} ${gTo}`]: gFrom.length > 0,
				}
			)}
			{...props}
		>
			{children}
		</Component>
	)
}

export default ShadowText
