import clsx from 'clsx'

export type NormalTextProps = {
	children?: React.ReactNode | string
	className?: string
	transitioned?: boolean
	as?: string | React.ElementType
	[x: string | number | symbol]: unknown
}

const NormalText = ({ className = '', children = '', transitioned = true, as = 'span', ...props }: NormalTextProps) => {
	const Component = as
	return (
		<Component
			className={clsx(className, 'flex justify-center items-center', 'rounded', { 'transition-colors': transitioned })}
			{...props}
		>
			{children}
		</Component>
	)
}

export default NormalText
