import clsx from 'clsx';
import Link from 'next/link';
import { EyeIcon, GithubIcon, LinkedinIcon, ProfileIcon, ResumeIcon, TwitterIcon } from '@/src/Icons';
import Button from '@/src/ui/Button';
import { SOCIALS } from '@/src/utils/constants';
import { IconProps, SocialProps } from '@/utils/types';

const SOCIAL_ICONS: Record<string, React.FC<IconProps>> = {
	github: GithubIcon,
	profile: ProfileIcon,
	x: TwitterIcon,
	linkedin: LinkedinIcon,
	resume: ResumeIcon,
	eye: EyeIcon,
};

type SocialButtonsProps = {
	bordered?: boolean;
	className?: string;
	mode?: 'hero' | 'compact' | 'footer';
};

const LABELS: Record<string, string> = {
	x: 'X (Twitter)',
	linkedin: 'LinkedIn',
	github: 'Github',
};

export default function SocialButtons({ bordered = false, className = '', mode = 'compact' }: SocialButtonsProps) {
	return (
		<div
			className={clsx(
				'transition-colors',
				'flex gap-2 items-center',
				bordered && 'border border-border-default hover:border-primary-700',
				'rounded-md w-fit h-[36px]',
				'px-[4px]',
				mode === 'hero' && 'h-auto px-0 gap-5',
				mode === 'footer' && 'px-0',
				className
			)}
			role='group'
			aria-label='Social media links'
		>
			{SOCIALS.map((social: SocialProps, index) => {
				const SocialIcon = SOCIAL_ICONS[social.icon];
				return (
					<Button
						key={social.key}
						height={mode === 'hero' ? 'h-auto' : 'h-[28px]'}
						width={mode === 'hero' ? 'w-auto' : 'w-[28px]'}
						focusOutlined
						className={clsx(
							'group rounded flex items-center justify-center hover:bg-bg-muted',
							mode === 'hero' && 'hover:bg-transparent px-0',
							mode === 'footer' && 'hover:bg-transparent',
							mode === 'footer' && index > 0 && 'ml-4'
						)}
						type={Link}
						href={social.action}
						rel='noopener noreferrer'
						target='_blank'
						aria-label={`Visit my ${social.icon} profile`}
					>
						<SocialIcon
							width={mode === 'hero' ? 16 : 18}
							height={mode === 'hero' ? 16 : 18}
							color='#5f5f5f'
							className={social.className}
							aria-hidden='true'
						/>
						{mode === 'hero' ? (
							<span className='ml-1 font-mono text-[10px] uppercase tracking-[0.1em] text-[var(--faint)]'>
								{LABELS[social.icon] || social.icon}
							</span>
						) : null}
					</Button>
				);
			})}
		</div>
	);
}
