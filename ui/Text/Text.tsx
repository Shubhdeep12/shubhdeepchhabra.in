'use client'
import GradientText, { GradientTextProps } from './GradientText'
import NormalText, { NormalTextProps } from './NormalText'
import ShadowText, { ShadowTextProps } from './ShadowText'

type ButtonProps = (ShadowTextProps | NormalTextProps | GradientTextProps) & {
	variant?: 'normal' | 'shadow' | 'gradient'
}

const Button = ({ variant = 'normal', ...props }: ButtonProps) => {
	switch (variant) {
		case 'normal':
			return <NormalText {...props} />
		case 'shadow':
			return <ShadowText {...props} />
		case 'gradient':
			return <GradientText {...props} />
		default:
			return <NormalText {...props} />
	}
}

export default Button
