'use client'

import Greeting from '../Greeting'
import Button from '../Button'
import { ProfileIcon } from '@/Icons'
import Text from '../Text'
import SocialButtons from '../SocialButtons'
import { useRouter } from 'next/navigation'
import AnimatedImage from '../AnimatedImage'

const Intro = () => {
	const router = useRouter()
	return (
		<section className='flex flex-col items-start laptop:flex-row-reverse laptop:items-center gap-5'>
			<section>
				<AnimatedImage
					className='rounded-xl'
					src='/assets/Shubhdeepchhabra.png'
					width={200}
					height={200}
					alt='shubhdeep Chhabra'
				/>
			</section>
			<section className='flex flex-col gap-5 w-full'>
				<Greeting />

				<div className='flex-wrap flex font-medium'>
					Unleashing my wizardry as a full-stack developer from India, I work magic in the software industry.
				</div>

				<div className='flex flex-row gap-3 my-4'>
					<Button
						height='h-[42px]'
						width='w-fit'
						focusOutlined
						className='p-4 flex gap-1 justify-center items-center rounded-lg bg-blue-700 hover:-translate-y-[1px] hover:bg-blue-800 hover:shadow-md dark:bg-blue-500 dark:hover:bg-blue-400'
						hoverable={false}
						onClick={() => router.push('/about')}
					>
						<ProfileIcon width={24} height={24} color='#fff' className='dark:fill-text-dark transition' />
						<Text
							transitioned={false}
							className='h-full text-white dark:text-text-dark font-extrabold dark:font-bold p-0'
						>
							More about me
						</Text>
					</Button>

					<SocialButtons
						bordered
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
								className:
									'group-hocus:fill-black group-hocus:stroke-black dark:group-hocus:fill-slate-200 dark:group-hocus:stroke-slate-200 dark:stroke-slate-400',
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
			</section>
		</section>
	)
}

export default Intro
