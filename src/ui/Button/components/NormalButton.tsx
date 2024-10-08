'use client';
import clsx from 'clsx';

export type NormalButtonProps = {
	type?: string | React.ElementType;
	focusOutlined?: boolean;
	width?: string;
	height?: string;
	className?: string;
	children?: React.ReactNode;
	href?: string;
	onClick?: React.MouseEventHandler;
	active?: boolean;
	hoverable?: boolean;
	[x: string | number | symbol]: unknown;
};

function NormalButton({
	type = 'button',
	focusOutlined = false,
	width = 'w-auto',
	height = 'h-auto',
	className = '',
	children = <></>,
	active = false,
	hoverable = true,
	...props
}: NormalButtonProps) {
	const Component = type;
	return (
		<Component
			className={clsx(
				width,
				height,
				'transition-colors',
				focusOutlined && 'focus:outline-dashed focus:outline-2 focus:outline-offset-4',
				className,
				hoverable && 'hocus:bg-background-button-hover-light dark:hover:bg-background-button-hover-dark',
				hoverable && active && 'bg-background-button-hover-light dark:bg-background-button-hover-dark'
			)}
			{...props}
		>
			{children}
		</Component>
	);
}

export default NormalButton;
