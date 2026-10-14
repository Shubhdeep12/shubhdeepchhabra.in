import { Metadata } from 'next';
import { Fragment } from 'react';
import type { IconType } from 'react-icons';
import { FaAws, FaJava, FaXTwitter } from 'react-icons/fa6';
import {
	FiAward,
	FiBookOpen,
	FiCalendar,
	FiCode,
	FiGitBranch,
	FiGithub,
	FiGlobe,
	FiLinkedin,
	FiMail,
	FiMapPin,
	FiPhone,
} from 'react-icons/fi';
import {
	SiCss,
	SiGithubactions,
	SiHtml5,
	SiJavascript,
	SiMysql,
	SiNextdotjs,
	SiNodedotjs,
	SiReact,
	SiReactquery,
	SiRedux,
	SiTailwindcss,
	SiTypescript,
} from 'react-icons/si';
import AnimatePage from '@/src/components/AnimatePage';
import Footer from '@/src/components/Footer';
import ResumeToolbar from '@/src/components/resume/ResumeToolbar';
import {
	formatDuration,
	formatRange,
	type Inline,
	RESUME,
	RESUME_JSON_PATH,
	RESUME_MD_PATH,
	RESUME_PDF_PATH,
	resumeToJsonLd,
	resumeToMarkdown,
	SITE_URL,
} from '@/src/utils/resume';

// Durations of the current role count up to today; rebuild daily so they stay right.
export const revalidate = 86400;

const description = `Resume of ${RESUME.name}, ${RESUME.label}. ${RESUME.summary}`;

export const metadata: Metadata = {
	title: 'Resume - Shubhdeep Chhabra',
	description,
	alternates: {
		canonical: `${SITE_URL}/resume`,
		types: {
			'text/markdown': `${SITE_URL}${RESUME_MD_PATH}`,
			'application/json': `${SITE_URL}${RESUME_JSON_PATH}`,
			'application/pdf': `${SITE_URL}${RESUME_PDF_PATH}`,
		},
	},
	openGraph: {
		type: 'profile',
		firstName: 'Shubhdeep',
		lastName: 'Chhabra',
		username: 'Shubhdeep12',
		title: 'Resume - Shubhdeep Chhabra',
		description,
		url: `${SITE_URL}/resume`,
		locale: 'en_US',
		siteName: 'Shubhdeep Chhabra',
	},
};

const LINK_ICONS: Record<string, IconType> = { GitHub: FiGithub, LinkedIn: FiLinkedin };

const SKILL_ICONS: Record<string, IconType> = {
	'JavaScript (ES6+)': SiJavascript,
	TypeScript: SiTypescript,
	Java: FaJava,
	HTML5: SiHtml5,
	CSS3: SiCss,
	React: SiReact,
	'Next.js': SiNextdotjs,
	'Redux Toolkit': SiRedux,
	'React Query': SiReactquery,
	'Tailwind CSS': SiTailwindcss,
	'Node.js': SiNodedotjs,
	AWS: FaAws,
	MySQL: SiMysql,
	'CI/CD': SiGithubactions,
};

function ExtLink({ href, children, className }: { href: string; children: React.ReactNode; className?: string }) {
	const external = !href.startsWith('mailto:');
	return (
		<a href={href} className={className} {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}>
			{children}
		</a>
	);
}

function RichText({ value }: { value: Inline }) {
	return (
		<>
			{value.map((run, i) =>
				typeof run === 'string' ? (
					<Fragment key={i}>{run}</Fragment>
				) : (
					<ExtLink key={i} href={run.href} className='resume-link'>
						{run.text}
					</ExtLink>
				)
			)}
		</>
	);
}

function DateRange({ start, end }: { start: string; end?: string }) {
	const [from, to] = formatRange(start, end).split(' – ');
	return (
		<>
			<time dateTime={start}>{from}</time> – {end ? <time dateTime={end}>{to}</time> : to}
		</>
	);
}

function Section({
	id,
	title,
	icon: Icon,
	children,
}: {
	id: string;
	title: string;
	icon?: IconType;
	children: React.ReactNode;
}) {
	return (
		<section className='resume-section' id={id} aria-labelledby={`${id}-title`}>
			<h2 id={`${id}-title`} className='resume-section-title'>
				{Icon ? <Icon aria-hidden='true' /> : null}
				{title}
			</h2>
			{children}
		</section>
	);
}

export default function ResumePage() {
	const r = RESUME;

	return (
		<AnimatePage>
			<script type='application/ld+json' dangerouslySetInnerHTML={{ __html: JSON.stringify(resumeToJsonLd()) }} />
			<section className='resume-page'>
				<ResumeToolbar markdown={resumeToMarkdown()} />

				<article className='resume-sheet'>
					<header className='resume-hero'>
						<div className='resume-hero-main'>
							<h1 className='resume-name'>{r.name}</h1>
							<p className='resume-role-label'>{r.label}</p>
							<ul className='resume-hero-links'>
								{r.links.map((link) => {
									const Icon = (link.network && LINK_ICONS[link.network]) || FiGlobe;
									return (
										<li key={link.href}>
											<ExtLink href={link.href} className='resume-hero-link'>
												<Icon aria-hidden='true' />
												{link.label}
											</ExtLink>
										</li>
									);
								})}
								<li>
									<ExtLink href='https://x.com/okshubhh' className='resume-hero-link'>
										<FaXTwitter aria-hidden='true' />
										@okshubhh
									</ExtLink>
								</li>
							</ul>
						</div>
						<ul className='resume-hero-meta'>
							<li>
								<FiMapPin aria-hidden='true' />
								{r.location.label}
							</li>
							<li>
								<FiMail aria-hidden='true' />
								<ExtLink href={`mailto:${r.email}`} className='resume-hero-link'>
									{r.email}
								</ExtLink>
							</li>
							{/* Filled in only when the PDF is generated; the number never ships in the page. */}
							<li data-pdf-slot='phone' hidden>
								<FiPhone aria-hidden='true' />
								<span data-pdf-value='' />
							</li>
						</ul>
					</header>

					<div className='resume-body'>
						<Section id='summary' title='Summary'>
							<p className='resume-summary'>{r.summary}</p>
						</Section>

						<div className='resume-columns'>
							<div className='resume-main'>
								<Section id='experience' title='Work Experience'>
									<ol className='resume-roles'>
										{r.experience.map((role) => (
											<li key={`${role.company}-${role.start}`} className='resume-role'>
												<span className='resume-badge' aria-hidden='true'>
													{role.logo ? <img src={role.logo} alt='' /> : role.initials}
												</span>
												<div className='resume-role-body'>
													<h3 className='resume-role-title'>
														<strong>{role.title}</strong>,{' '}
														{role.companyUrl ? (
															<ExtLink href={role.companyUrl} className='resume-company'>
																{role.company}
															</ExtLink>
														) : (
															<span className='resume-company'>{role.company}</span>
														)}
													</h3>
													<p className='resume-role-meta'>
														<FiCalendar aria-hidden='true' />
														<span>
															<DateRange start={role.start} end={role.end} />
														</span>
														<span className='resume-dot' aria-hidden='true'>
															•
														</span>
														<span>{formatDuration(role.start, role.end)}</span>
														<span className='resume-dot' aria-hidden='true'>
															•
														</span>
														<span>{role.location}</span>
													</p>
													<p className='resume-role-stack'>{role.stack.join(', ')}</p>
													<ul className='resume-bullets'>
														{role.highlights.map((h, i) => (
															<li key={i}>
																<RichText value={h} />
															</li>
														))}
													</ul>
												</div>
											</li>
										))}
									</ol>
								</Section>
							</div>

							<aside className='resume-aside'>
								<Section id='open-source' title='Open Source' icon={FiGitBranch}>
									<ul className='resume-aside-list'>
										{r.openSource.map((project) => (
											<li key={project.name}>
												<h3 className='resume-aside-title'>
													{project.link ? (
														<ExtLink href={project.link.href} className='resume-company'>
															{project.name}
														</ExtLink>
													) : (
														project.name
													)}
												</h3>
												<ul className='resume-bullets'>
													{project.highlights.map((h, i) => (
														<li key={i}>
															<RichText value={h} />
														</li>
													))}
												</ul>
											</li>
										))}
									</ul>
								</Section>

								<Section id='skills' title='Skills' icon={FiCode}>
									<dl className='resume-skills'>
										{r.skills.map((group) => (
											<div key={group.name} className='resume-skill-group'>
												<dt>{group.name}</dt>
												<dd>
													<ul className='resume-chips'>
														{group.keywords.map((keyword) => {
															const Icon = SKILL_ICONS[keyword];
															return (
																<li key={keyword} className='resume-chip'>
																	{Icon ? <Icon aria-hidden='true' /> : null}
																	{keyword}
																</li>
															);
														})}
													</ul>
												</dd>
											</div>
										))}
									</dl>
								</Section>

								<Section id='education' title='Education' icon={FiAward}>
									{r.education.map((edu) => (
										<div key={edu.institution} className='resume-edu'>
											<FiBookOpen aria-hidden='true' className='resume-edu-icon' />
											<div>
												<h3 className='resume-aside-title'>
													{edu.studyType} in {edu.area}
												</h3>
												<p>
													{edu.url ? (
														<ExtLink href={edu.url} className='resume-link'>
															{edu.institution}
														</ExtLink>
													) : (
														edu.institution
													)}
												</p>
												<p className='resume-role-meta'>
													<FiCalendar aria-hidden='true' />
													<span>
														<DateRange start={edu.start} end={edu.end} />
													</span>
												</p>
												<p className='resume-edu-score'>{edu.score}</p>
											</div>
										</div>
									))}
								</Section>
							</aside>
						</div>

						<p className='resume-closing'>
							Want to go deeper? I write about engineering at{' '}
							<ExtLink href={`${SITE_URL}/writings`} className='resume-link'>
								okshubh.in/writings
							</ExtLink>
							, or reach me at{' '}
							<ExtLink href={`mailto:${r.email}`} className='resume-link'>
								{r.email}
							</ExtLink>
							.
						</p>
					</div>
				</article>
			</section>
			<Footer />
		</AnimatePage>
	);
}
