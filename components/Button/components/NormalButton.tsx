import cx from 'clsx'

export type NormalButtonProps = {
	type?: string | React.ElementType
	hoverStyle?: boolean
	focusOutlined?: boolean
	width?: string
	height?: string
	className?: string
	children?: React.ReactNode
}

function NormalButton({
	type = 'button',
	hoverStyle = false,
	focusOutlined = false,
	width = 'w-auto',
	height = 'h-auto',
	className = '',
	children = <></>,
}: NormalButtonProps) {
	const Component = type
	return (
		<Component
			className={cx(
				width,
				height,
				focusOutlined &&
					'focus:outline-dashed focus:outline-2 focus:outline-offset-4 focus:outline-gray-900 focus:bg-slate-200',
				hoverStyle && 'hover:bg-slate-200',

				className
			)}
		>
			{children}
		</Component>
	)
}

export default NormalButton
