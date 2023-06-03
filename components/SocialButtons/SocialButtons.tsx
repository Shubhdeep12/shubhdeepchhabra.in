import {
	BackToTopIcon,
	EyeIcon,
	GithubIcon,
	IconProps,
	LinkedinIcon,
	MediumIcon,
	ProfileIcon,
	ResumeIcon,
	TwitterIcon,
} from '@/assets/Icons'
import Button from '../Button'
import cx from 'clsx'
import { scrollToTop } from '../BackToTop'

type SocialButtonsProps = {
	socials?: SocialProps[]
	bordered?: boolean
	backToTop?: boolean
	className?: string
}

type SocialProps = {
	key: string
	icon: keyof typeof SOCIAL_ICONS
	className: string
	action?: () => void
}

const SOCIAL_ICONS: Record<string, React.FC<IconProps>> = {
	github: GithubIcon,
	profile: ProfileIcon,
	twitter: TwitterIcon,
	linkedin: LinkedinIcon,
	medium: MediumIcon,
	resume: ResumeIcon,
	eye: EyeIcon,
}

export default function SocialButtons({
	socials = [],
	bordered = false,
	backToTop = false,
	className = '',
}: SocialButtonsProps) {
	return (
		<div
			className={cx(
				'transition-colors',
				'flex gap-2 items-center',
				bordered && 'border border-slate-200 hover:border-blue-800 dark:border-slate-800 dark:hover:border-blue-200',
				'rounded-lg w-fit h-[42px] ',
				'px-[6px]',
				className
			)}
		>
			{socials.map((social: SocialProps) => {
				const SocialIcon = SOCIAL_ICONS[social.icon]
				return (
					<Button
						key={social.key}
						height='h-[30px]'
						width='w-[30px]'
						focusOutlined
						className='group rounded flex items-center justify-center'
						onClick={social.action}
					>
						<SocialIcon width={22} height={22} color='#5f5f5f' className={social.className} />
					</Button>
				)
			})}

			{backToTop && (
				<Button
					height='h-[30px]'
					width='w-[30px]'
					focusOutlined
					className='group rounded flex items-center justify-center'
					onClick={() => scrollToTop()}
				>
					<BackToTopIcon
						width={22}
						height={22}
						color='#5f5f5f'
						className='group-hocus:fill-black dark:group-hocus:fill-slate-200 dark:fill-slate-400'
					/>
				</Button>
			)}
		</div>
	)
}
