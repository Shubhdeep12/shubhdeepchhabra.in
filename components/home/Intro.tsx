'use client'

import Greeting from '../Greeting'
import Button from '@/ui/Button'
import { ProfileIcon } from '@/Icons'
import Text from '@/ui/Text'
import SocialButtons from '../SocialButtons'
import { useRouter } from 'next/navigation'
// import AnimatedImage from '../AnimatedImage'

const Intro = () => {
	const router = useRouter()
	return (
		<section className='flex flex-col items-start laptop:flex-row-reverse laptop:items-center gap-5'>
			{/* <section>
				<AnimatedImage
					className='rounded-xl'
					src='/assets/Shubhdeepchhabra.png'
					width={200}
					height={200}
					alt='shubhdeep Chhabra'
				/>
			</section> */}
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
						className='p-4 flex gap-1 justify-center items-center rounded-lg bg-primary-700 hover:-translate-y-[1px] hover:bg-primary-800 hover:shadow-md dark:bg-primary-500 dark:hover:bg-primary-400'
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

					<SocialButtons bordered />
				</div>
			</section>
		</section>
	)
}

export default Intro
