'use client'
import NormalButton, { NormalButtonProps } from './components/NormalButton'
import TextButton, { TextButtonProps } from './components/TextButton'

type ButtonProps = (NormalButtonProps | TextButtonProps) & {
	variant?: 'normal' | 'text'
}

const Button = ({ variant = 'normal', ...props }: ButtonProps) => {
	switch (variant) {
		case 'normal':
			return <NormalButton {...props} />
		case 'text':
			return <TextButton {...props} />
		default:
			return <NormalButton {...props} />
	}
}

export default Button
