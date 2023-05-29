'use client'

import { useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import cx from 'clsx'
import { RxHamburgerMenu, RxCross2 } from 'react-icons/rx'
import { IoMoon, IoSunny } from 'react-icons/io5'

import { useTheme } from '@/providers/theme-provider'

import Button from '../Button'
import Text from '../Text'

const Navbar = () => {
	const pathname = usePathname()
	const router = useRouter()
	const [navbarExpanded, setNavbarExpanded] = useState(false)
	const { isDark, toggleTheme } = useTheme()

	return (
		<nav
			className={cx(
				'fixed top-2 left-1/2 laptop:top-4 laptop:max-w-laptop w-full mx-auto -translate-x-1/2',
				'flex flex-col',
				'transition-all',
				'rounded-lg',
				'p-[10px]',
				'bg-background-nav-light/20 dark:bg-background-nav-dark/20 backdrop-blur-[10px] backdrop-saturate-150',
				'hover:shadow-dark',
				'border border-border-nav-dark dark:border-border-nav-light'
			)}
		>
			<section className='h-[40px] flex gap-4 justify-between items-center'>
				<div className='h-full'>
					<Button onClick={() => router.push('/')} height='h-full' variant='normal' focusOutlined className='rounded'>
						<Text className='font-semibold text-base'>Shubhdeep</Text>
					</Button>
				</div>

				<section className='flex grow justify-end h-full'>
					<ul className='hidden laptop:flex gap-6'>
						<li>
							<Button
								onClick={() => router.push('/about')}
								height='h-full'
								variant='normal'
								focusOutlined
								className='rounded'
								active={pathname === '/about'}
							>
								<Text className='font-semibold text-base' gradient active={pathname === '/about'}>
									About
								</Text>
							</Button>
						</li>
						<li>
							<Button
								onClick={() => router.push('/projects')}
								height='h-full'
								variant='normal'
								focusOutlined
								className='rounded'
								active={pathname === '/projects'}
							>
								<Text
									className='font-semibold text-base '
									gradient
									gFrom='from-[#c86827]'
									gTo='to-[#c69227]'
									active={pathname === '/projects'}
								>
									Projects
								</Text>
							</Button>
						</li>
						<li>
							<Button
								onClick={() => router.push('/blogs')}
								height='h-full'
								variant='normal'
								focusOutlined
								className='rounded'
								active={pathname === '/blogs'}
							>
								<Text
									className='font-semibold text-base'
									gFrom='from-[#bc2f48]'
									gTo='to-[#7a4cbb]'
									gradient
									active={pathname === '/blogs'}
								>
									Blogs
								</Text>
							</Button>
						</li>
					</ul>
				</section>
				<div className='h-full w-[42px]'>
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
				<ul className={navbarExpanded ? 'laptop:hidden flex align-middle w-full flex-col gap-6' : 'hidden'}>
					<li>
						<Button
							onClick={() => {
								router.push('/about')
								setNavbarExpanded(false)
							}}
							height='h-[42px]'
							width='w-full'
							variant='normal'
							focusOutlined
							className='rounded'
							active={pathname === '/about'}
						>
							<Text className='font-semibold text-base' gradient active={pathname === '/about'}>
								About
							</Text>
						</Button>
					</li>
					<li>
						<Button
							onClick={() => {
								router.push('/projects')
								setNavbarExpanded(false)
							}}
							height='h-[42px] w-full'
							variant='normal'
							focusOutlined
							className='rounded'
							active={pathname === '/projects'}
						>
							<Text
								className='font-semibold text-base '
								gradient
								gFrom='from-[#c86827]'
								gTo='to-[#c69227]'
								active={pathname === '/projects'}
							>
								Projects
							</Text>
						</Button>
					</li>
					<li>
						<Button
							onClick={() => {
								router.push('/blogs')
								setNavbarExpanded(false)
							}}
							height='h-[42px] w-full'
							variant='normal'
							focusOutlined
							className='rounded'
							active={pathname === '/blogs'}
						>
							<Text
								className='font-semibold text-base'
								gFrom='from-[#bc2f48]'
								gTo='to-[#7a4cbb]'
								gradient
								active={pathname === '/blogs'}
							>
								Blogs
							</Text>
						</Button>
					</li>
				</ul>
			</section>
		</nav>
	)
}

export default Navbar
