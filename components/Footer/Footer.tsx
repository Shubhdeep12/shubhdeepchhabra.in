'use client'
import { useState } from 'react'
import Text from '../Text'
import Button from '../Button'
import cx from 'clsx'
import { useRouter } from 'next/navigation'
import SocialButtons from '../SocialButtons'

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
			key: 'blogs',
			title: 'Blogs',
			route: '/blogs',
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
			route: '/about',
			gradient: true,
			gFrom: 'from-blue-500',
			gTo: 'to-green-500',
			underline: 'hocus:decoration-blue-500',
		},
		{
			key: 'Source',
			title: 'Source',
			route: '/projects',
			gradient: true,
			gFrom: 'from-[#c86827]',
			gTo: 'to-[#c69227]',
			underline: 'hocus:decoration-[#c86827]',
		},
	]
	return (
		<footer
			className='
				w-full max-w-laptop mx-auto
				flex flex-col gap-9 py-9 px-2 border-t bottom-0
			'
		>
			<div className='flex gap-9'>
				<ul className='flex flex-col min-w-[100px] laptop:min-w-[140px] gap-4'>
					{NAVBAR_ITEMS.map((item) => (
						<li key={item.key} onFocus={() => setCurrentFocussed(item.key)} onBlur={() => setCurrentFocussed('')}>
							<Button
								focusOutlined
								hoverable={false}
								className={cx(
									'rounded-sm hocus:underline	hocus:underline-offset-2 hocus:decoration-2	hocus:text-transparent',
									item.underline
								)}
								onClick={() => router.push(item.route)}
							>
								<Text
									gradient
									active={currentFocussed === item.key}
									gFrom={item.gFrom}
									gTo={item.gTo}
									className={cx('hover:text-transparent font-semibold')}
								>
									{item.title}
								</Text>
							</Button>
						</li>
					))}
				</ul>

				<ul className='flex flex-col min-w-[100px] laptop:min-w-[140px] gap-4'>
					{EXTRA_FOOTER_ITEMS.map((item) => (
						<li key={item.key} onFocus={() => setCurrentFocussed(item.key)} onBlur={() => setCurrentFocussed('')}>
							<Button
								focusOutlined
								hoverable={false}
								className='rounded-sm hocus:underline
								hocus:underline-offset-2
								hocus:decoration-2
								'
								onClick={() => window.open(item.route, '_blank')}
							>
								<Text
									gradient
									active={currentFocussed === item.key}
									gFrom={item.gFrom}
									gTo={item.gTo}
									className={cx('hover:text-transparent font-semibold')}
								>
									{item.title}
								</Text>
							</Button>
						</li>
					))}
				</ul>
			</div>

			<div className='flex justify-between'>
				<Button focusOutlined hoverable={false} className='rounded-sm' onClick={() => router.push('/')}>
					<Text className={cx('font-semibold')}>Shubhdeep</Text>
				</Button>

				<SocialButtons
					socials={[
						{
							key: 'github',
							icon: 'github',
							className: 'group-hocus:fill-black dark:group-hocus:fill-slate-200 dark:fill-slate-400',
							action: () => window.open('https://github.com/Shubhdeep12', '_blank'),
						},
						{
							key: 'linkedin',
							icon: 'linkedin',
							className: 'group-hocus:fill-blue-600 dark:fill-slate-400',
							action: () => window.open('https://www.linkedin.com/in/shubhdeepchhabra/', '_blank'),
						},
						{
							key: 'twitter',
							icon: 'twitter',
							className: 'group-hocus:fill-sky-500 dark:fill-slate-400',
							action: () => window.open('https://twitter.com/ShubhInTech', '_blank'),
						},
						{
							key: 'medium',
							icon: 'medium',
							className:
								'group-hocus:fill-black group-hocus:stroke-black dark:group-hocus:fill-slate-200 dark:group-hocus:stroke-slate-200 dark:stroke-slate-400',
							action: () => window.open('https://shubhdeepchhabra.medium.com/', '_blank'),
						},
					]}
				/>
			</div>
		</footer>
	)
}
export default Footer
