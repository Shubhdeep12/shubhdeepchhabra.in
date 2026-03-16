'use client';
import Image from 'next/image';
import Text from '@/src/ui/Text';
import SocialButtons from '../SocialButtons';

const AboutSection = () => {
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
						src='/assets/shubhdeepchhabra.png'
						width={100}
						height={105}
						className='min-w-[100px] h-[105px]'
					/>
				</div>
				<div className='px-2 flex flex-col gap-2'>
					<Text className='font-bold text-2xl px-2'>Shubhdeep Chhabra</Text>
					<Text className='font-medium text-lg text-gray-600 dark:text-gray-300'>Product Engineer</Text>
				</div>
				<Text className='font-medium text-lg text-gray-600 dark:text-gray-300'>India</Text>
				<SocialButtons className='px-4' />
			</div>

			<p className='max-w-none text-left laptop:text-justify text-base font-medium'>
				👋 Hello! {"I'm"} <strong>Shubhdeep Chhabra</strong>, a <strong>Product Engineer</strong> with{' '}
				<strong>4+ years</strong> of experience building and scaling <strong>B2B SaaS</strong> platforms. I have led
				architecture migrations, performance optimization, and accessibility compliance across multi-tenant systems
				serving <strong>150K+ users</strong>. I am experienced in AI-integrated product features and contribute to large{' '}
				<strong>open-source</strong> codebases. Based in <strong>India</strong>, I focus on web development, innovative
				solutions to complex problems, and high-quality, user-friendly products.
			</p>
		</section>
	);
};

export default AboutSection;
