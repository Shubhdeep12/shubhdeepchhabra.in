'use client'

import { EmailIcon, TwitterIcon } from '@/assets/Icons'
import Button from '@/components/Button'
import SocialButtons from '@/components/SocialButtons'
import Text from '@/components/Text'
import { useTheme } from '@/providers/theme-provider'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

export default function About() {
	const { isDark } = useTheme()
	const router = useRouter()
	return (
		<section className='flex flex-col gap-16 p-2'>
			<section id='about-section' className='flex flex-col items-start gap-6'>
				<Text
					shadow={!isDark}
					shadowColor='purple'
					gradient={isDark}
					active={isDark}
					className='font-bold text-3xl text-heading-dark'
				>
					About
				</Text>
				<div className='w-full rounded-lg p-4 flex flex-col gap-2 laptop:flex-row items-center bg-slate-200 dark:bg-slate-700 text-center'>
					<div className='w-[100px] h-[100px] transition-colors rounded-full bg-sky-50 overflow-hidden'>
						<Image alt='p1' src={require('../../assets/shubh-avatar-1.png')} className='w-[100px] h-[105px]' />
					</div>
					<Text className='font-bold text-2xl px-2 w-min'>Shubhdeep Chhabra</Text>
					<Text className='font-medium text-lg text-gray-600 dark:text-gray-300'>Software Developer</Text>
					<Text className='font-medium text-lg text-gray-600 dark:text-gray-300'>India</Text>
					<SocialButtons
						className='px-4'
						socials={[
							{
								key: 'github',
								icon: 'github',
								className: 'group-hocus:fill-black dark:group-hocus:fill-slate-200 dark:fill-slate-400',
								action: () => window.open('https://github.com/Shubhdeep12', '_blank'),
							},
							{
								key: 'linkedin',
								icon: 'linkedin',
								className: 'group-hocus:fill-blue-600 dark:fill-slate-400',
								action: () => window.open('https://www.linkedin.com/in/shubhdeepchhabra/', '_blank'),
							},
							{
								key: 'twitter',
								icon: 'twitter',
								className: 'group-hocus:fill-sky-500 dark:fill-slate-400',
								action: () => window.open('https://twitter.com/ShubhInTech', '_blank'),
							},
							{
								key: 'medium',
								icon: 'medium',
								className:
									'group-hocus:fill-black group-hocus:stroke-black dark:group-hocus:fill-slate-200 dark:group-hocus:stroke-slate-200 dark:stroke-slate-400',
								action: () => window.open('https://shubhdeepchhabra.medium.com/', '_blank'),
							},
						]}
					/>
				</div>

				<p className='max-w-none text-justify text-base font-medium'>
					👋{"I'm"} <strong>Shubhdeep Chhabra</strong>, a software engineer from <strong>India</strong>, specializing in
					web development. With a passion for creating things on the web, I <strong>graduated in 2020</strong> and have
					since dedicated myself to honing my skills. I thrive on challenging projects and enjoy finding innovative
					solutions to complex problems. Alongside my work, I actively contribute to{' '}
					<strong>Open Source Projects</strong>, embracing the collaborative nature of the tech community. With strong{' '}
					<strong>problem-solving abilities</strong> and attention to detail, I strive to deliver high-quality,
					user-friendly solutions.
				</p>
			</section>

			<section id='expirence' className='flex flex-col items-start gap-6'>
				<Text
					shadow={!isDark}
					shadowColor='orange'
					gradient={isDark}
					active={isDark}
					className='font-bold text-3xl text-heading-dark'
				>
					Experience
				</Text>

				<div className='flex flex-col gap-2 items-start'>
					<div className='flex gap-2 items-center text-base laptop:text-lg font-extrabold'>
						<Text>Software Engineer III @</Text>
						<Button hoverable={false}>
							<Text className='text-blue-400 underline underline-offset-2 decoration-2 font-semibold'>Auzmor</Text>
						</Button>
					</div>
					<div className='py-[2px] px-1 bg-gray-200 w-fit rounded-md'>
						<Text className='text-sm font-semibold text-gray-600'>`Jan 2023 - Today`</Text>
					</div>
					<div className='flex gap-2 items-center text-base laptop:text-lg font-extrabold'>
						<Text>Software Engineer I @</Text>
						<Button hoverable={false}>
							<Text className='text-blue-400 underline underline-offset-2 decoration-2 font-semibold'>Auzmor</Text>
						</Button>
					</div>
					<div className='py-[2px] px-1 bg-gray-200 w-fit rounded-md'>
						<Text className='text-sm font-semibold text-gray-600'>`Dec 2021 - Dec 2022`</Text>
					</div>
					<ol className='list-disc pl-5'>
						<li>
							<p className=' max-w-none text-justify pt-4 font-medium'>
								As of now, I am actively working as a software engineer, continuously honing my skills and contributing
								to the success of my current organization. With a focus on web development, I am involved in various
								projects aimed at creating innovative solutions for our clients. Leveraging my expertise in technologies
								such as <strong>React, JavaScript, CSS, Styled Components</strong>, I consistently deliver high-quality
								and user-friendly products. Collaborating with cross-functional teams, I ensure seamless project
								execution and timely deliveries.
							</p>
						</li>
						<li>
							<p className='max-w-none text-justify font-medium'>
								My strong problem-solving abilities and attention to detail have proven invaluable in resolving complex
								issues and optimizing system performance. Committed to personal and professional growth, I stay updated
								with the latest industry trends and advancements. I am dedicated to making a positive impact through my
								work and driving the success of my current organization.
							</p>
						</li>
					</ol>
				</div>

				<div className='flex flex-col gap-2 items-start'>
					<div className='flex gap-2 items-center text-base laptop:text-lg font-extrabold'>
						<Text>Associate Software Engineer @</Text>
						<Button hoverable={false}>
							<Text className='text-blue-400 underline underline-offset-2 decoration-2 font-semibold'>Accenture</Text>
						</Button>
					</div>

					<div className='py-[2px] px-1 bg-gray-200 w-fit rounded-md'>
						<Text className='text-sm font-semibold text-gray-600'>`Jan 2021 - Dec 2021`</Text>
					</div>

					<ol className='list-disc pl-5'>
						<li>
							<p className=' max-w-none text-justify pt-4 font-medium'>
								Part of the team of specialist developers responsible for the fast-paced development and global delivery
								of client-critical projects. Used Java, JavaScript, HTML SQL, JIRA, HP ALM. Worked with Innovation Team
								to enhance cross-skill(React) and create some components for the team
							</p>
						</li>
					</ol>
				</div>
			</section>

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
								onClick={() => router.push('/about')}
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
								onClick={() => router.push('/about')}
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
		</section>
	)
}
