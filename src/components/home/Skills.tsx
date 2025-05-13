'use client';

import Button from '@/src/ui/Button';
import Skills from '../Skills';
import Text from '@/src/ui/Text';
import { ResumeIcon } from '@/src/Icons';
import { useRouter } from 'next/navigation';

const SkillsPills = () => {
	const router = useRouter();

	return (
		<section id='skill-pills' className='flex flex-col gap-4' aria-label='Skills'>
			<div
				id='skills-header'
				className='flex flex-col gap-6 laptop:flex-row justify-between items-start laptop:items-center'
			>
				<Text
					variant='shadow'
					gFrom='dark:from-cyan-500'
					gTo='dark:to-sky-500'
					shadowColor='blue'
					className='font-bold text-2xl text-heading-dark'
					as={'h2'}
				>
					Skills
				</Text>

				<Button
					height='h-[42px]'
					width='w-fit'
					focusOutlined
					className='p-4 flex gap-1 justify-center items-center rounded-lg
							 hocus:-translate-y-[1px] hocus:shadow-md
							 hocus:bg-zinc-100 dark:hocus:bg-zinc-800
							 border border-zinc-200 hocus:border-primary-800 dark:border-zinc-800 dark:hover:border-primary-200'
					hoverable={false}
					onClick={() => router.push('/resume')}
					aria-label='View my resume'
				>
					<ResumeIcon
						width={24}
						height={24}
						color='#fff'
						className='fill-text-dark dark:fill-white transition'
						aria-hidden='true'
					/>
					<Text
						transitioned={false}
						className='h-full dark:text-white text-text-dark font-extrabold dark:font-bold p-0'
					>
						Resume
					</Text>
				</Button>
			</div>

			<Skills />
		</section>
	);
};

export default SkillsPills;
