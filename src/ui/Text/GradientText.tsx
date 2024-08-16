import clsx from 'clsx';
export type GradientTextProps = {
	gFrom?: string;
	gTo?: string;
	children?: React.ReactNode | string;
	className?: string;
	active?: boolean;
	hoverable?: boolean;
	transitioned?: boolean;
	as?: string | React.ElementType;
	[x: string | number | symbol]: unknown;
};

const GradientText = ({
	gFrom = 'from-primary-500',
	gTo = 'to-green-500',
	className = '',
	children = '',
	hoverable = false,
	active = false,
	transitioned = true,
	as = 'span',
	...props
}: GradientTextProps) => {
	const Component = as;
	return (
		<Component
			className={clsx(className, 'flex justify-center items-center', 'rounded', {
				'transition-colors': transitioned,
				'hover:bg-background-button-hover-light dark:hover:bg-background-button-hover-dark': hoverable,
				'hover:text-transparent bg-clip-text': true,
				'hover:bg-gradient-to-tr': true,
				[`${gFrom} ${gTo}`]: true,
				'bg-gradient-to-tr text-transparent': true && active,
			})}
			{...props}
		>
			{children}
		</Component>
	);
};

export default GradientText;
