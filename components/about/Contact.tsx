'use client'

import { EmailIcon, TwitterIcon } from '@/assets/Icons'
import Button from '../Button'
import Text from '../Text'
import { useRouter } from 'next/navigation'
import { useTheme } from '@/providers/theme-provider'
import Image from 'next/image'

const Contact = () => {
	const { isDark } = useTheme()
	const router = useRouter()
	return (
		<section id='contact' className='flex flex-col items-start gap-6'>
			<Text
				shadow={!isDark}
				shadowColor='blue'
				gradient={isDark}
				active={isDark}
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
							 hocus:bg-sky-100 dark:hocus:bg-sky-800 dark:hocus:bg-opacity-10
							 border border-slate-200 hocus:border-sky-800 dark:border-slate-800 dark:hover:border-sky-200'
							hoverable={false}
							onClick={() => window.open('https://twitter.com/ShubhInTech', '_blank')}
						>
							<TwitterIcon
								width={24}
								height={24}
								color='#5f5f5f'
								className='group-hocus:fill-sky-500 dark:fill-slate-400 transition'
							/>
							<Text
								transitioned={false}
								className='h-full dark:text-white text-text-dark font-extrabold dark:font-bold p-0'
							>
								Twitter
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
							onClick={() => window.open('mailto:chhabrashubhdeep@google.com')}
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
					className='object-cover object-center aspect-square max-w-[192px] laptop:max-w-[220px] filter drop-shadow-doodle mx-auto'
					alt='contact'
					src={require('../../assets/contact.webp')}
				/>
			</div>
		</section>
	)
}

export default Contact