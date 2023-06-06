import cx from 'clsx'
export type ShadowTextProps = {
	shadowColor?: string
	gFrom?: string
	gTo?: string
	children?: React.ReactNode | string
	className?: string
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
	...props
}: ShadowTextProps) => {
	return (
		<span
			className={cx(
				className,
				'flex justify-center items-center',
				'rounded',
				'transition-colors',
				[`${SHADOW_COLOR[shadowColor]}`],
				'dark:[text-shadow:none]',
				{
					'dark:bg-gradient-to-r dark:text-transparent dark:bg-clip-text': gFrom.length > 0,
					[`${gFrom} ${gTo}`]: gFrom.length > 0,
				}
			)}
			{...props}
		>
			{children}
		</span>
	)
}

export default ShadowText
