'use client'

import Button from '../Button'
import { usePathname, useRouter } from 'next/navigation'

import { IoMoon } from 'react-icons/io5'
import Text from '../Text'
const Navbar = () => {
	const pathname = usePathname()
	const router = useRouter()
	return (
		<nav
			className='
				fixed top-2 left-1/2 h-[60px] laptop:top-4 laptop:max-w-laptop w-full mx-auto -translate-x-1/2
				flex justify-between items-center
				rounded-lg
				p-[10px]
				bg-slate-[0.5] backdrop-blur-[10px] backdrop-saturate-150
				hover:[box-shadow:0_0_8px_2px_#3867d629] 
				border border-[#2867d61f]
			'
		>
			<div className='h-full'>
				<Button onClick={() => router.push('/')} height='h-full' variant='normal' focusOutlined className='rounded'>
					<Text className='font-bold text-base'>Shubhdeep</Text>
				</Button>
			</div>

			<section className='laptop:flex laptop:gap-8 hidden h-full'>
				<ul className='flex gap-6'>
					<li>
						<Button
							onClick={() => router.push('/about')}
							height='h-full'
							variant='normal'
							focusOutlined
							className='rounded'
							active={pathname === '/about'}
						>
							<Text className='font-bold text-base' gradient active={pathname === '/about'}>
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
								className='font-bold text-base '
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
								className='font-bold text-base'
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

				<div className='h-full w-[32px]'>
					<Button
						height='h-full'
						width='w-full'
						variant='normal'
						focusOutlined
						className='rounded flex justify-center items-center'
					>
						<IoMoon size={20} />
					</Button>
				</div>
			</section>
		</nav>
	)
}

export default Navbar
