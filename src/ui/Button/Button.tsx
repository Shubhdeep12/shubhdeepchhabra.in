'use client';
import NormalButton, { NormalButtonProps } from './components/NormalButton';
import TextButton, { TextButtonProps } from './components/TextButton';

type ButtonProps = (NormalButtonProps | TextButtonProps) & {
	variant?: 'normal' | 'text';
	[x: string | number | symbol]: unknown;
};

const Button = ({ variant = 'normal', ...props }: ButtonProps) => {
	if (variant === 'text') {
		return <TextButton {...props} />;
	}

	return <NormalButton {...props} />;
};

export default Button;
