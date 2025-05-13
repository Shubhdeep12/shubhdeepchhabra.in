'use client';

import Greeting from '../Greeting';
import Button from '@/src/ui/Button';
import { ProfileIcon } from '@/src/Icons';
import Text from '@/src/ui/Text';
import SocialButtons from '../SocialButtons';
import { useRouter } from 'next/navigation';
import AnimatedImage from '../AnimatedImage';

const Intro = () => {
	const router = useRouter();
	return (
		<section className='flex flex-col items-start gap-5' role='region' aria-label='Introduction'>
			<div className='flex flex-col items-start gap-5 laptop:flex-row-reverse laptop:items-center'>
				<section>
					<AnimatedImage
						className='rounded-2xl'
						src='/assets/shubhdeepchhabra.webp'
						width={200}
						height={200}
						alt='Shubhdeep Chhabra'
						aria-label='Profile picture of Shubhdeep Chhabra'
					/>
				</section>
				<section className='flex flex-col gap-5 w-full'>
					<Greeting />

					<div className='flex-wrap flex font-medium'>
						Passionate about coding and solving problems, I’m a software developer from India, turning ideas into
						impactful software solutions.
					</div>
				</section>
			</div>
			<div className='flex flex-row gap-3 mt-4'>
				<Button
					height='h-[42px]'
					width='w-fit'
					focusOutlined
					className='p-4 flex gap-1 justify-center items-center rounded-lg bg-primary-700 hover:-translate-y-[1px] hover:bg-primary-800 hover:shadow-md dark:bg-primary-500 dark:hover:bg-primary-400'
					hoverable={false}
					onClick={() => router.push('/about')}
					aria-label='Learn more about me'
				>
					<ProfileIcon
						width={24}
						height={24}
						color='#fff'
						className='dark:fill-text-dark transition'
						aria-hidden='true'
					/>
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
	);
};

export default Intro;
