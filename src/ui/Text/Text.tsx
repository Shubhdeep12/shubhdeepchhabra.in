'use client';
import GradientText, { GradientTextProps } from './GradientText';
import NormalText, { NormalTextProps } from './NormalText';
import ShadowText, { ShadowTextProps } from './ShadowText';

type TextProps = (ShadowTextProps | NormalTextProps | GradientTextProps) & {
	variant?: 'normal' | 'shadow' | 'gradient';
};

const Text = ({ variant = 'normal', ...props }: TextProps) => {
	switch (variant) {
		case 'normal':
			return <NormalText {...props} />;
		case 'shadow':
			return <ShadowText {...props} />;
		case 'gradient':
			return <GradientText {...props} />;
		default:
			return <NormalText {...props} />;
	}
};

export default Text;
