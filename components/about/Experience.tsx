'use client'

import Text from '../Text'
import Button from '../Button'

const Experience = () => {
	return (
		<section id='experience' className='flex flex-col items-start gap-6'>
			<Text shadow shadowColor='orange' className='font-bold text-3xl text-heading-dark'>
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
						<p className=' max-w-none text-left laptop:text-justify pt-4 font-medium'>
							As of now, I am actively working as a software engineer, continuously honing my skills and contributing to
							the success of my current organization. With a focus on web development, I am involved in various projects
							aimed at creating innovative solutions for our clients. Leveraging my expertise in technologies such as{' '}
							<strong>React, JavaScript, CSS, Styled Components</strong>, I consistently deliver high-quality and
							user-friendly products. Collaborating with cross-functional teams, I ensure seamless project execution and
							timely deliveries.
						</p>
					</li>
					<li>
						<p className='max-w-none text-left laptop:text-justify font-medium'>
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
						<p className=' max-w-none text-left laptop:text-justify pt-4 font-medium'>
							Part of the team of specialist developers responsible for the fast-paced development and global delivery
							of client-critical projects. Used Java, JavaScript, HTML SQL, JIRA, HP ALM. Worked with Innovation Team to
							enhance cross-skill(React) and create some components for the team
						</p>
					</li>
				</ol>
			</div>
		</section>
	)
}

export default Experience
