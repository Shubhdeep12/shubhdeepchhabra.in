'use client';
import Button from '@/src/ui/Button';
import Text from '@/src/ui/Text';
import { resumeUrl } from '@/src/utils/constants';
import { ResumeIcon, GDriveIcon } from '@/src/Icons';

export default function ResumePage() {
	return (
		<div className='container mx-auto px-4 py-8 max-w-4xl'>
			<div className='flex justify-between items-center mb-8'>
				<Text
					variant='shadow'
					gFrom='dark:from-green-400'
					gTo='dark:to-indigo-500'
					shadowColor='green'
					className='font-bold text-3xl text-heading-dark'
					as={'h1'}
				>
					Resume
				</Text>
				<div className='flex gap-3'>
					<Button
						height='h-[42px]'
						width='w-fit'
						focusOutlined
						className='group p-4 flex gap-1 justify-center items-center rounded-lg
							 hocus:-translate-y-[1px] hocus:shadow-md 
							 hocus:bg-zinc-100 dark:hocus:bg-zinc-800
							 border border-zinc-200 hocus:border-primary-800 dark:border-zinc-800 dark:hover:border-primary-200'
						hoverable={false}
						onClick={() => window.open(resumeUrl, '_blank')}
					>
						<ResumeIcon width={24} height={24} color='#fff' className='fill-text-dark dark:fill-white transition' />
						<Text
							transitioned={false}
							className='h-full dark:text-white text-text-dark font-extrabold dark:font-bold p-0'
						>
							Download
						</Text>
					</Button>
					<Button
						height='h-[42px]'
						width='w-fit'
						focusOutlined
						className='group p-4 flex gap-1 justify-center items-center rounded-lg
							 hocus:-translate-y-[1px] hocus:shadow-md 
							 hocus:bg-zinc-100 dark:hocus:bg-zinc-800
							 border border-zinc-200 hocus:border-primary-800 dark:border-zinc-800 dark:hover:border-primary-200'
						hoverable={false}
						onClick={() => window.open(resumeUrl, '_blank')}
					>
						<GDriveIcon width={28} height={28} />
						<Text
							transitioned={false}
							className='h-full dark:text-white text-text-dark font-extrabold dark:font-bold p-0'
						>
							Drive
						</Text>
					</Button>
				</div>
			</div>

			<div className='bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md'>
				{/* Header Section */}
				<div className='border-b border-gray-200 dark:border-gray-700 pb-6 mb-6'>
					<h2 className='text-3xl font-bold'>Shubhdeep Chhabra</h2>
					<div className='flex flex-wrap gap-2 text-gray-600 dark:text-gray-400 mt-2'>
						<span>chhabrashubhdeep@gmail.com</span>
						<span className='hidden sm:inline'>|</span>
						<span>+91-85618-10770</span>
					</div>
				</div>

				{/* Summary Section */}
				<div className='mb-8'>
					<h3 className='text-xl font-semibold mb-3'>SUMMARY</h3>
					<p className='text-gray-700 dark:text-gray-300'>
						Experienced Software Engineer with a strong foundation in modern web technologies, performance optimization,
						and accessibility. Proven track record of leading high-impact projects in SaaS and open-source environments
						using React, TypeScript, and scalable architectures. Passionate about building intuitive user experiences
						and continuously improving products through metrics-driven development.
					</p>
				</div>

				{/* Experience Section */}
				<div className='mb-8'>
					<h3 className='text-xl font-semibold mb-4'>EXPERIENCE</h3>

					<div className='mb-6'>
						<div className='flex flex-col sm:flex-row sm:justify-between mb-1'>
							<h4 className='font-medium'>AUZMOR TECHNOLOGY PVT. LTD. | Sr. Software Engineer</h4>
							<span className='text-gray-600 dark:text-gray-400'>Jan 2025 – Present | Remote</span>
						</div>
						<ul className='list-disc list-inside text-gray-700 dark:text-gray-300 ml-1'>
							<li>
								Redesigned the RBAC system with fine-grained frontend permission management and custom role creation,
								improving organizational control over access.
							</li>
						</ul>
					</div>

					<div className='mb-6'>
						<div className='flex flex-col sm:flex-row sm:justify-between mb-1'>
							<h4 className='font-medium'>AUZMOR TECHNOLOGY PVT. LTD. | Software Engineer III</h4>
							<span className='text-gray-600 dark:text-gray-400'>Jan 2023 – Dec 2024 | Remote</span>
						</div>
						<ul className='list-disc list-inside text-gray-700 dark:text-gray-300 ml-1'>
							<li>
								Revamped the learning experience by developing key LMS features like Mentorship, Checklists, and
								Interactive Trainings, driving a 50% increase in engagement and retention.
							</li>
							<li>
								Migrated codebase from React 16 (CRA) to React 18+ Vite, cutting build times by 40% and removing Webpack
								bottlenecks.
							</li>
							<li>Led ADA compliance efforts for 10k+ users, aligning with WCAG 2.1 standards.</li>
							<li>Enhanced performance, boosting Lighthouse scores from 20 to 70 and improving UX.</li>
						</ul>
					</div>

					<div className='mb-6'>
						<div className='flex flex-col sm:flex-row sm:justify-between mb-1'>
							<h4 className='font-medium'>AUZMOR TECHNOLOGY PVT. LTD. | Software Engineer I</h4>
							<span className='text-gray-600 dark:text-gray-400'>Dec 2021 – Dec 2022 | Remote</span>
						</div>
						<ul className='list-disc list-inside text-gray-700 dark:text-gray-300 ml-1'>
							<li>Built a full branding system enabling company-specific UI themes, achieving 100% client adoption.</li>
							<li>
								Delivered Social Learning and Post-Training features (e.g., posts, polls, eSignatures), enhancing
								retention and reducing churn.
							</li>
							<li>Developed Multi-Factor Authentication (MFA) to strengthen security.</li>
						</ul>
					</div>

					<div className='mb-6'>
						<div className='flex flex-col sm:flex-row sm:justify-between mb-1'>
							<h4 className='font-medium'>ACCENTURE SOLUTIONS PVT. LTD. | Associate Software Engineer</h4>
							<span className='text-gray-600 dark:text-gray-400'>Jan 2021 – Dec 2021 | Gurugram, India</span>
						</div>
						<ul className='list-disc list-inside text-gray-700 dark:text-gray-300 ml-1'>
							<li>
								Trained in full-stack development (Java, JavaScript, React, SQL), contributing to scalable solutions.
							</li>
						</ul>
					</div>
				</div>

				{/* Open Source Section */}
				<div className='mb-8'>
					<h3 className='text-xl font-semibold mb-3'>OPEN SOURCE CONTRIBUTIONS</h3>
					<ul className='list-disc list-inside text-gray-700 dark:text-gray-300 ml-1'>
						<li>
							Building and maintaining Spotlight, Sentry&apos;s local trace viewer, enhancing debugging with improved
							navigation, span interactions, and observability.
						</li>
						<li>
							Made some big and small contributions to Formbricks, Kobalte dev, Antiwork, Microsoft, Razorpay and other
							organizations.
						</li>
					</ul>
				</div>

				{/* Two Column Layout for Education and Links */}
				<div className='grid grid-cols-1 md:grid-cols-2 gap-8 mb-8'>
					<div>
						<h3 className='text-xl font-semibold mb-3'>EDUCATION</h3>
						<h4 className='font-medium'>JECRC, JAIPUR</h4>
						<p className='text-gray-700 dark:text-gray-300'>B.Tech in Electronics and Communication Engineering</p>
						<p className='text-gray-600 dark:text-gray-400'>Aug 2016 – Aug 2020 | CGPA: 7.2</p>
					</div>

					<div>
						<h3 className='text-xl font-semibold mb-3'>LINKS</h3>
						<ul className='space-y-1 text-gray-700 dark:text-gray-300'>
							<li>
								Portfolio:{' '}
								<a
									href='https://shubhdeepchhabra.in'
									className='text-blue-600 dark:text-blue-400 hover:underline'
									target='_blank'
									rel='noopener noreferrer'
								>
									shubhdeepchhabra.in
								</a>
							</li>
							<li>
								LinkedIn:{' '}
								<a
									href='https://linkedin.com/in/shubhdeepchhabra'
									className='text-blue-600 dark:text-blue-400 hover:underline'
									target='_blank'
									rel='noopener noreferrer'
								>
									@shubhdeepchhabra
								</a>
							</li>
							<li>
								GitHub:{' '}
								<a
									href='https://github.com/Shubhdeep12'
									className='text-blue-600 dark:text-blue-400 hover:underline'
									target='_blank'
									rel='noopener noreferrer'
								>
									@Shubhdeep12
								</a>
							</li>
							<li>
								X:{' '}
								<a
									href='https://x.com/okshubhh'
									className='text-blue-600 dark:text-blue-400 hover:underline'
									target='_blank'
									rel='noopener noreferrer'
								>
									@okshubhh
								</a>
							</li>
						</ul>
					</div>
				</div>

				{/* Skills Section */}
				<div>
					<h3 className='text-xl font-semibold mb-4'>SKILLS</h3>

					<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
						<div>
							<h4 className='font-medium mb-2'>LANGUAGES</h4>
							<div className='flex flex-wrap gap-2'>
								<span className='px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-sm'>JavaScript (ES6+)</span>
								<span className='px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-sm'>TypeScript</span>
							</div>
						</div>

						<div>
							<h4 className='font-medium mb-2'>MARKUP & STYLING</h4>
							<div className='flex flex-wrap gap-2'>
								<span className='px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-sm'>HTML</span>
								<span className='px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-sm'>CSS</span>
								<span className='px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-sm'>Tailwind CSS</span>
								<span className='px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-sm'>Styled Components</span>
							</div>
						</div>

						<div>
							<h4 className='font-medium mb-2'>FRAMEWORKS & LIBRARIES</h4>
							<div className='flex flex-wrap gap-2'>
								<span className='px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-sm'>React</span>
								<span className='px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-sm'>Next.js</span>
								<span className='px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-sm'>Node.js</span>
								<span className='px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-sm'>Express.js</span>
								<span className='px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-sm'>Redux Toolkit</span>
								<span className='px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-sm'>Zustand</span>
								<span className='px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-sm'>Framer Motion</span>
								<span className='px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-sm'>Jest</span>
							</div>
						</div>

						<div>
							<h4 className='font-medium mb-2'>ARCHITECTURE</h4>
							<div className='flex flex-wrap gap-2'>
								<span className='px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-sm'>Microfrontends</span>
								<span className='px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-sm'>
									Real-time Communication
								</span>
								<span className='px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-sm'>Design Systems</span>
							</div>
						</div>

						<div>
							<h4 className='font-medium mb-2'>TOOLING & DEVOPS</h4>
							<div className='flex flex-wrap gap-2'>
								<span className='px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-sm'>Webpack</span>
								<span className='px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-sm'>Vite</span>
								<span className='px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-sm'>GitHub Actions</span>
								<span className='px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-sm'>Vercel</span>
								<span className='px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-sm'>Sentry</span>
								<span className='px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-sm'>ESLint</span>
								<span className='px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-sm'>Prettier</span>
							</div>
						</div>

						<div>
							<h4 className='font-medium mb-2'>API & DATA HANDLING</h4>
							<div className='flex flex-wrap gap-2'>
								<span className='px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-sm'>REST APIs</span>
								<span className='px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-sm'>GraphQL</span>
								<span className='px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-sm'>tRPC</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
