import cx from 'clsx'

export type NormalButtonProps = {
	type?: string | React.ElementType
	focusOutlined?: boolean
	width?: string
	height?: string
	className?: string
	children?: React.ReactNode
	href?: string
	onClick?: React.MouseEventHandler
}

function NormalButton({
	type = 'button',
	focusOutlined = false,
	width = 'w-auto',
	height = 'h-auto',
	className = '',
	children = <></>,
	...props
}: NormalButtonProps) {
	const Component = type
	return (
		<Component
			className={cx(
				width,
				height,
				focusOutlined && 'focus:outline-dashed focus:outline-2 focus:outline-offset-4 focus:outline-gray-900',
				className,
				'hocus:bg-slate-200'
			)}
			{...props}
		>
			{children}
		</Component>
	)
}

export default NormalButton
