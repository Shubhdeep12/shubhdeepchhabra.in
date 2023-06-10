import clsx from 'clsx'

export type NormalTextProps = {
	children?: React.ReactNode | string
	className?: string
	transitioned?: boolean
}

const NormalText = ({ className = '', children = '', transitioned = true, ...props }: NormalTextProps) => {
	return (
		<span
			className={clsx(className, 'flex justify-center items-center', 'rounded', { 'transition-colors': transitioned })}
			{...props}
		>
			{children}
		</span>
	)
}

export default NormalText
