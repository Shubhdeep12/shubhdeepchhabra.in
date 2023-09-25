'use client'
import { useState } from 'react'
import Text from '../Text'
import Button from '../Button'
import clsx from 'clsx'
import { useRouter } from 'next/navigation'
import SocialButtons from '../SocialButtons'
import { SCIcon } from '@/Icons'
import Image from 'next/image'
import Link from 'next/link'

const Footer = () => {
	const router = useRouter()
	const [currentFocussed, setCurrentFocussed] = useState<string>('')
	const NAVBAR_ITEMS = [
		{
			key: 'about',
			title: 'About',
			route: '/about',
			gradient: true,
			gFrom: 'from-blue-500',
			gTo: 'to-green-500',
			underline: 'hocus:decoration-blue-500',
		},
		{
			key: 'projects',
			title: 'Projects',
			route: '/projects',
			gradient: true,
			gFrom: 'from-[#c86827]',
			gTo: 'to-[#c69227]',
			underline: 'hocus:decoration-[#c86827]',
		},
		{
			key: 'blog',
			title: 'Blog',
			route: '/blog',
			gradient: true,
			gFrom: 'from-[#bc2f48]',
			gTo: 'to-[#7a4cbb]',
			underline: 'hocus:decoration-[#bc2f48]',
		},
	]

	const EXTRA_FOOTER_ITEMS = [
		{
			key: 'resume',
			title: 'Resume',
			route: 'https://drive.google.com/file/d/1SDPIS1xhiANTTXlZR4gwjUxLsuNaw8kH/view?usp=drivesdk',
			gradient: true,
			gFrom: 'from-blue-500',
			gTo: 'to-green-500',
			underline: 'hocus:decoration-blue-500',
		},
		{
			key: 'Source',
			title: 'Source',
			route: 'https://github.com/Shubhdeep12/ShubhdeepChhabra',
			gradient: true,
			gFrom: 'from-[#c86827]',
			gTo: 'to-[#c69227]',
			underline: 'hocus:decoration-[#c86827]',
		},
	]

	const DONATE_SOURCES = [
		{
			key: 'coffee',
			title: 'Coffee',
			route: 'https://www.buymeacoffee.com/shubhdeep',
			gradient: true,
			gFrom: 'from-yellow-500',
			gTo: 'to-orange-500',
			underline: 'hocus:decoration-yellow-500',
		},
	]
	return (
		<footer
			className='
				w-full max-w-laptop mx-auto
				flex flex-col gap-9 py-9 px-2 border-t bottom-0'
		>
			<div className='flex gap-9'>
				<ul className='flex flex-col min-w-[100px] laptop:min-w-[140px] gap-4 items-start'>
					{NAVBAR_ITEMS.map((item) => (
						<li key={item.key} onFocus={() => setCurrentFocussed(item.key)} onBlur={() => setCurrentFocussed('')}>
							<Button
								focusOutlined
								hoverable={false}
								className={clsx(
									'duration-0 rounded-sm hocus:underline	hocus:underline-offset-2 hocus:decoration-2	hocus:text-transparent',
									item.underline
								)}
								type={Link}
								href={item.route}
							>
								<Text
									variant='gradient'
									active={currentFocussed === item.key}
									gFrom={item.gFrom}
									gTo={item.gTo}
									className={clsx('hover:text-transparent font-semibold')}
								>
									{item.title}
								</Text>
							</Button>
						</li>
					))}
				</ul>

				<ul className='flex flex-col min-w-[100px] laptop:min-w-[140px] gap-4 items-start'>
					{EXTRA_FOOTER_ITEMS.map((item) => (
						<li key={item.key} onFocus={() => setCurrentFocussed(item.key)} onBlur={() => setCurrentFocussed('')}>
							<Button
								focusOutlined
								hoverable={false}
								className={clsx(
									'duration-0 rounded-sm hocus:underline	hocus:underline-offset-2 hocus:decoration-2	hocus:text-transparent',
									item.underline
								)}
								onClick={() => window.open(item.route, '_blank')}
							>
								<Text
									variant='gradient'
									active={currentFocussed === item.key}
									gFrom={item.gFrom}
									gTo={item.gTo}
									className={clsx('hover:text-transparent font-semibold')}
								>
									{item.title}
								</Text>
							</Button>
						</li>
					))}
				</ul>

				<ul className='flex flex-col min-w-[100px] laptop:min-w-[140px] gap-4 items-start'>
					{DONATE_SOURCES.map((item) => (
						<li key={item.key} onFocus={() => setCurrentFocussed(item.key)} onBlur={() => setCurrentFocussed('')}>
							<Button
								focusOutlined
								hoverable={false}
								className={clsx(
									'duration-0 rounded-sm hocus:underline	hocus:underline-offset-2 hocus:decoration-2	hocus:text-transparent',
									item.underline
								)}
								onClick={() => window.open(item.route, '_blank')}
							>
								<Text
									variant='gradient'
									active={currentFocussed === item.key}
									gFrom={item.gFrom}
									gTo={item.gTo}
									className={clsx('hover:text-transparent font-semibold')}
								>
									{item.title}
								</Text>
							</Button>
						</li>
					))}
				</ul>
			</div>

			<div className='flex justify-between'>
				<Button
					focusOutlined
					hoverable={false}
					className='group rounded-sm hocus:underline	hocus:underline-offset-2 hocus:decoration-2 flex items-center'
					onClick={() => router.push('/')}
				>
					<span className='block relative min-w-[32px] w-[32px] h-[32px] [&>*]:absolute [&>*]:top-1/2 [&>*]:left-0 [&>*]:transform [&>*]:-translate-y-1/2 [&>*]:transition'>
						<SCIcon
							width={24}
							height={24}
							className='
							opacity-100 scale-100 visible
							group-hocus:opacity-0 group-hocus:scale-0 group-hocus:invisible
							transform transition
							'
						/>
						<Image
							src='/assets/shubh-avatar-1.png'
							height={24}
							width={24}
							alt='shubh-avatar'
							className='
							group-hocus:opacity-100 group-hocus:scale-100 group-hocus:visible
							opacity-0 scale-0 invisible
							transform transition
							'
						/>
					</span>
					<Text className={clsx('font-semibold')}>Shubhdeep</Text>
				</Button>

				<SocialButtons
					backToTop
					socials={[
						{
							key: 'github',
							icon: 'github',
							className: 'group-hocus:fill-black dark:group-hocus:fill-slate-200 dark:fill-slate-400',
							action: 'https://github.com/Shubhdeep12',
						},
						{
							key: 'linkedin',
							icon: 'linkedin',
							className: 'group-hocus:fill-blue-600 dark:fill-slate-400',
							action: 'https://www.linkedin.com/in/shubhdeepchhabra/',
						},
						{
							key: 'twitter',
							icon: 'twitter',
							className: 'group-hocus:fill-sky-500 dark:fill-slate-400',
							action: 'https://twitter.com/ShubhInTech',
						},
						{
							key: 'medium',
							icon: 'medium',
							className:
								'group-hocus:fill-black group-hocus:stroke-black dark:group-hocus:fill-slate-200 dark:group-hocus:stroke-slate-200 dark:stroke-slate-400',
							action: 'https://shubhdeepchhabra.medium.com/',
						},
					]}
				/>
			</div>
		</footer>
	)
}
export default Footer
