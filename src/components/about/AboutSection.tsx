'use client';
import Text from '@/src/ui/Text';
import Image from 'next/image';
import SocialButtons from '../SocialButtons';

const AboutSection = () => {
	console.log('in about page');
	return (
		<section id='about-section' className='flex flex-col items-start gap-6'>
			<Text
				variant='shadow'
				gFrom='dark:from-red-300'
				gTo='dark:to-purple-500'
				shadowColor='purple'
				className='font-bold text-3xl text-heading-dark'
				as={'h1'}
			>
				About
			</Text>
			<div className='w-full rounded-lg p-4 flex flex-col gap-2 laptop:gap-5 laptop:p-5 laptop:flex-row items-center bg-zinc-200 dark:bg-zinc-700 text-center'>
				<div className='w-[100px] h-[100px] transition-colors rounded-full bg-sky-50 overflow-hidden'>
					<Image
						alt='Shubhdeep-avatar'
						src='/assets/Shubhdeepchhabra.png'
						width={100}
						height={105}
						className='min-w-[100px] h-[105px]'
					/>
				</div>
				<div className='px-2 flex flex-col gap-2'>
					<Text className='font-bold text-2xl px-2'>Shubhdeep Chhabra</Text>
					<Text className='font-medium text-lg text-gray-600 dark:text-gray-300'>Software Engineer</Text>
				</div>
				<Text className='font-medium text-lg text-gray-600 dark:text-gray-300'>India</Text>
				<SocialButtons className='px-4' />
			</div>

			<p className='max-w-none text-left laptop:text-justify text-base font-medium'>
				👋{"I'm"} <strong>Shubhdeep Chhabra</strong>, a software engineer from <strong>India</strong>, specializing in
				web development. With a passion for creating things on the web, I <strong>graduated in 2020</strong> and have
				since dedicated myself to honing my skills. I thrive on challenging projects and enjoy finding innovative
				solutions to complex problems. Alongside my work, I actively contribute to <strong>Open Source Projects</strong>
				, embracing the collaborative nature of the tech community. With strong{' '}
				<strong>problem-solving abilities</strong> and attention to detail, I strive to deliver high-quality,
				user-friendly solutions.
			</p>
		</section>
	);
};

export default AboutSection;
