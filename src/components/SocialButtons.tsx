import { EyeIcon, GithubIcon, LinkedinIcon, MediumIcon, ProfileIcon, ResumeIcon, TwitterIcon } from '@/src/Icons';
import Button from '@/src/ui/Button';
import clsx from 'clsx';
import Link from 'next/link';
import BackToTopButton from './BackToTopButton';
import { IconProps, SocialProps } from '@/utils/types';
import { SOCIALS } from '@/src/utils/constants';

const SOCIAL_ICONS: Record<string, React.FC<IconProps>> = {
	github: GithubIcon,
	profile: ProfileIcon,
	twitter: TwitterIcon,
	linkedin: LinkedinIcon,
	medium: MediumIcon,
	resume: ResumeIcon,
	eye: EyeIcon,
};

type SocialButtonsProps = {
	bordered?: boolean;
	backToTop?: boolean;
	className?: string;
};

export default function SocialButtons({ bordered = false, backToTop = false, className = '' }: SocialButtonsProps) {
	return (
		<div
			className={clsx(
				'transition-colors',
				'flex gap-2 items-center',
				bordered &&
					'border border-zinc-200 hover:border-primary-800 dark:border-zinc-800 dark:hover:border-primary-200',
				'rounded-lg w-fit h-[42px] ',
				'px-[6px]',
				className
			)}
		>
			{SOCIALS.map((social: SocialProps) => {
				const SocialIcon = SOCIAL_ICONS[social.icon];
				return (
					<Button
						key={social.key}
						height='h-[30px]'
						width='w-[30px]'
						focusOutlined
						className='group rounded flex items-center justify-center'
						type={Link}
						href={social.action}
						rel='noopener noreferrer'
						target='_blank'
					>
						<SocialIcon width={22} height={22} color='#5f5f5f' className={social.className} />
					</Button>
				);
			})}

			{backToTop && <BackToTopButton />}
		</div>
	);
}
