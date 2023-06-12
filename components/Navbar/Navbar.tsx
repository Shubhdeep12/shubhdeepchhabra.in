'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import clsx from 'clsx'
import { RxHamburgerMenu, RxCross2 } from 'react-icons/rx'
import { IoMoon, IoSunny } from 'react-icons/io5'

import { useTheme } from '@/providers/theme-provider'

import Button from '../Button'
import Text from '../Text'
import { useIsMounted } from '@/hooks/isMounted'
import Image from 'next/image'
import { SCIcon } from '@/Icons'
import Link from 'next/link'
import Loader from '../Loader'

const Navbar = () => {
	const pathname = usePathname()
	const isMounted = useIsMounted()
	const [navbarExpanded, setNavbarExpanded] = useState(false)
	const { isDark, toggleTheme } = useTheme()

	const NAVBAR_ITEMS = [
		{
			key: 'about',
			title: 'About',
			route: '/about',
			gFrom: 'from-blue-500',
			gTo: 'to-green-500',
			active: pathname?.startsWith('/about'),
		},
		{
			key: 'projects',
			title: 'Projects',
			route: '/projects',
			gFrom: 'from-[#c86827]',
			gTo: 'to-[#c69227]',
			active: pathname?.startsWith('/projects'),
		},
		{
			key: 'blog',
			title: 'Blog',
			route: '/blog',
			gFrom: 'from-[#bc2f48]',
			gTo: 'to-[#7a4cbb]',
			active: pathname?.startsWith('/blog'),
		},
	]

	return (
		<nav
			className={clsx(
				'fixed top-2 left-1/2 laptop:top-4 laptop:max-w-laptop w-full mx-auto -translate-x-1/2',
				'flex flex-col',
				'transition-all',
				'rounded-lg',
				'p-[10px]',
				'bg-background-nav-light dark:bg-background-nav-dark backdrop-blur-[10px] backdrop-saturate-150',
				'hover:shadow-dark',
				'border border-border-nav-dark dark:border-border-nav-light',
				'z-10'
			)}
		>
			<section className='h-[40px] flex gap-4 justify-between items-center'>
				<div className='h-full'>
					<Button
						type={Link}
						href='/'
						height='h-full'
						variant='normal'
						focusOutlined
						className='group rounded overflow-hidden flex items-center'
					>
						<span className='block relative min-w-[32px] w-[32px] h-[32px] [&>*]:absolute [&>*]:top-1/2 [&>*]:left-0 [&>*]:transform [&>*]:-translate-y-1/2 [&>*]:transition'>
							<SCIcon
								width={32}
								height={32}
								className='
							opacity-100 scale-100 visible
							group-hocus:opacity-0 group-hocus:scale-0 group-hocus:invisible
							transform transition
							'
							/>
							<Image
								src='/assets/shubh-avatar-1.png'
								height={32}
								width={32}
								alt='shubh-avatar'
								className='
							group-hocus:opacity-100 group-hocus:scale-100 group-hocus:visible group-hocus:block
							opacity-0 scale-0 invisible
							transform transition
							'
							/>
						</span>
						<Text className='font-extrabold text-xl py-2 px-1'>Shubhdeep</Text>
					</Button>
				</div>

				<section className='flex grow justify-end h-full'>
					<ul className='hidden laptop:flex gap-6'>
						{NAVBAR_ITEMS.map((item) => (
							<li key={item.key}>
								<Button
									type={Link}
									href={item.route}
									height='h-full'
									width='w-full'
									variant='normal'
									focusOutlined
									className='rounded flex justify-center'
									active={item.active}
								>
									<Text
										className='font-semibold text-base p-2'
										gFrom={item.gFrom}
										gTo={item.gTo}
										variant='gradient'
										active={item.active}
										hoverable
									>
										{item.title}
									</Text>
								</Button>
							</li>
						))}
					</ul>
				</section>
				<div className='h-full w-[42px] flex items-center justify-center'>
					{isMounted ? (
						<Button
							height='h-full'
							width='w-full'
							variant='normal'
							focusOutlined
							className='rounded flex justify-center items-center'
							onClick={toggleTheme}
						>
							{isDark ? <IoSunny size={20} /> : <IoMoon size={20} />}
						</Button>
					) : (
						<Loader />
					)}
				</div>

				<div className='laptop:hidden h-full w-[42px]'>
					<Button
						height='h-full'
						width='w-full'
						variant='normal'
						focusOutlined
						className='rounded flex justify-center items-center'
						onClick={() => setNavbarExpanded(!navbarExpanded)}
					>
						<div className={`transition-all ${navbarExpanded ? 'rotate-45' : '-rotate-45'}`}>
							{navbarExpanded ? (
								<RxCross2 className='-rotate-45' size={20} />
							) : (
								<RxHamburgerMenu size={20} className='rotate-45' />
							)}
						</div>
					</Button>
				</div>
			</section>

			<section
				className={`${
					navbarExpanded ? 'h-[calc(100vh-75px)]' : 'h-0'
				} transition-all w-full flex items-center laptop:hidden`}
			>
				<ul className={navbarExpanded ? 'laptop:hidden flex align-middle w-full h-[42px] flex-col gap-6' : 'hidden'}>
					{NAVBAR_ITEMS.map((item) => (
						<li key={item.key}>
							<Button
								type={Link}
								onClick={() => setNavbarExpanded(false)}
								href={item.route}
								height='h-full'
								width='w-full'
								variant='normal'
								focusOutlined
								className='rounded flex justify-center'
								active={item.active}
							>
								<Text
									className='font-semibold text-base p-2'
									gFrom={item.gFrom}
									gTo={item.gTo}
									variant='gradient'
									active={item.active}
									hoverable
								>
									{item.title}
								</Text>
							</Button>
						</li>
					))}
				</ul>
			</section>
		</nav>
	)
}

export default Navbar
