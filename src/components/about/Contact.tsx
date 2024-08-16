'use client';

import { EmailIcon, TwitterIcon } from '@/src/Icons';
import Button from '@/src/ui/Button';
import Text from '@/src/ui/Text';
import Image from 'next/image';

const Contact = () => {
	return (
		<section id='contact' className='flex flex-col items-start gap-6'>
			<Text
				variant='shadow'
				gFrom='dark:from-primary-500'
				gTo='dark:to-purple-500'
				shadowColor='blue'
				className='font-bold text-3xl text-heading-dark'
			>
				Contact
			</Text>

			<Text className='font-medium'>
				{"I'm"} always open to chat, connect with new people and explore new opportunities.
			</Text>
			<div className='flex flex-col laptop:flex-row-reverse gap-4 laptop:gap-12'>
				<div className='flex flex-col gap-4 items-start'>
					<Text className='font-medium'>{"There's"} a few ways you can get it touch:</Text>
					<div className='flex gap-4'>
						<Button
							height='h-[42px]'
							width='w-fit'
							focusOutlined
							className='group p-4 flex gap-1 justify-center items-center rounded-lg
							 hocus:-translate-y-[1px] hocus:shadow-md 
							 hocus:bg-gray-100 dark:hocus:bg-gray-800 dark:hocus:bg-opacity-10
							 border border-slate-200 hocus:border-gray-800 dark:border-slate-800 dark:hover:border-gray-200'
							hoverable={false}
							onClick={() => window.open('https://twitter.com/ShubhInTech', '_blank')}
						>
							<TwitterIcon
								width={24}
								height={24}
								color='#5f5f5f'
								className='group-hocus:fill-black group-hocus:stroke-black dark:group-hocus:fill-slate-200 dark:group-hocus:stroke-slate-200 dark:stroke-slate-400 transition'
							/>
							<Text
								transitioned={false}
								className='h-full dark:text-white text-text-dark font-extrabold dark:font-bold p-0'
							>
								X
							</Text>
						</Button>
						<Button
							height='h-[42px]'
							width='w-fit'
							focusOutlined
							className='group p-4 flex gap-1 justify-center items-center rounded-lg
							 hocus:-translate-y-[1px] hocus:shadow-md 
							 hocus:bg-red-100 dark:hocus:bg-red-700 dark:hocus:bg-opacity-10
							 border border-slate-200 hocus:border-red-800 dark:border-slate-800 dark:hover:border-red-200'
							hoverable={false}
							onClick={() => window.open('mailto:chhabrashubhdeep@gmail.com')}
						>
							<EmailIcon
								width={24}
								height={24}
								color='#5f5f5f'
								className='group-hocus:fill-red-500 dark:fill-slate-400 transition'
							/>
							<Text
								transitioned={false}
								className='h-full dark:text-white text-text-dark font-extrabold dark:font-bold p-0'
							>
								Email
							</Text>
						</Button>
					</div>
				</div>
				<Image
					className='object-cover object-center aspect-square w-[192px] laptop:w-[220px] filter drop-shadow-doodle mx-auto'
					alt='contact'
					width={100}
					height={100}
					src='/assets/contact.webp'
				/>
			</div>
		</section>
	);
};

export default Contact;
