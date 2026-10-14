import { Metadata } from 'next';
import { Fragment } from 'react';
import type { IconType } from 'react-icons';
import { FaAws, FaJava, FaXTwitter } from 'react-icons/fa6';
import { FiGithub, FiGlobe, FiLayers, FiLinkedin, FiMail, FiMapPin, FiPhone } from 'react-icons/fi';
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
import { fitScript, RESUME_SHEET_WIDTH } from '@/src/components/resume/fit';
import ResumeCanvas from '@/src/components/resume/ResumeCanvas';
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

/** Generic icons for entries without a company logo; every other `logo` value is an official image, shown as is. */
const GENERIC_ICONS: Record<string, IconType> = { 'design-systems': FiLayers };

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

function Logo({ logo, className }: { logo: string; className: string }) {
	const Icon = GENERIC_ICONS[logo];
	if (Icon) return <Icon aria-hidden='true' className={className} />;
	return <img src={logo} alt='' aria-hidden='true' className={`${className} resume-logo-img`} />;
}

function ExtLink({ href, children, className }: { href: string; children: React.ReactNode; className?: string }) {
	const external = !href.startsWith('mailto:') && !href.startsWith(SITE_URL);
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
				) : 'strong' in run ? (
					<strong key={i} className='resume-strong'>
						{run.strong}
					</strong>
				) : (
					<ExtLink key={i} href={run.href} className='resume-link'>
						{run.logo ? <Logo logo={run.logo} className='resume-inline-logo' /> : null}
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

function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
	return (
		<section className='resume-section' id={id} aria-labelledby={`${id}-title`}>
			<h2 id={`${id}-title`} className='resume-section-title'>
				<a href={`#${id}`} className='resume-section-anchor'>
					{title}
				</a>
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

				<ResumeCanvas>
					<article className='resume-sheet' style={{ width: RESUME_SHEET_WIDTH }}>
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
									<Section id='experience' title='Experience'>
										<ol className='resume-roles'>
											{r.experience.map((role) => (
												<li key={`${role.company}-${role.start}`} className='resume-role'>
													<span className='resume-badge'>
														{role.logo ? <Logo logo={role.logo} className='resume-badge-logo' /> : role.initials}
													</span>
													<div className='resume-role-body'>
														<h3 className='resume-role-title'>
															<strong>{role.title}</strong>
															<span className='resume-role-at'> at </span>
															{role.companyUrl ? (
																<ExtLink href={role.companyUrl} className='resume-company'>
																	{role.company}
																</ExtLink>
															) : (
																<span className='resume-company'>{role.company}</span>
															)}
														</h3>
														<p className='resume-role-meta'>
															<span>
																<DateRange start={role.start} end={role.end} />
															</span>
															<span className='resume-dot' aria-hidden='true'>
																/
															</span>
															<span>{formatDuration(role.start, role.end)}</span>
															<span className='resume-dot' aria-hidden='true'>
																/
															</span>
															<span>{role.location}</span>
														</p>
														<ul className='resume-bullets'>
															{role.highlights.map((h, i) => (
																<li key={i}>
																	<RichText value={h} />
																</li>
															))}
														</ul>
														<ul className='resume-stack' aria-label='Stack'>
															{role.stack.map((item) => (
																<li key={item}>{item}</li>
															))}
														</ul>
													</div>
												</li>
											))}
										</ol>
									</Section>
								</div>

								<aside className='resume-aside'>
									<Section id='open-source' title='Open Source'>
										<ul className='resume-aside-list'>
											{r.openSource.map((project) => (
												<li key={project.name}>
													<h3 className='resume-aside-title'>
														{project.logo ? <Logo logo={project.logo} className='resume-title-logo' /> : null}
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

									<Section id='skills' title='Skills'>
										<dl className='resume-skills'>
											{r.skills.map((group) => {
												// Tools get icon chips; practices read better as a plain line.
												const asChips = group.keywords.some((keyword) => SKILL_ICONS[keyword]);
												return (
													<div key={group.name} className='resume-skill-group'>
														<dt>{group.name}</dt>
														<dd>
															{asChips ? (
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
															) : (
																<p className='resume-skill-line'>{group.keywords.join(', ')}</p>
															)}
														</dd>
													</div>
												);
											})}
										</dl>
									</Section>

									<Section id='education' title='Education'>
										{r.education.map((edu) => (
											<div key={edu.institution} className='resume-edu'>
												{edu.logo ? (
													<span className='resume-badge'>
														<Logo logo={edu.logo} className='resume-badge-logo' />
													</span>
												) : null}
												<div>
													<h3 className='resume-aside-title'>
														{edu.studyType} in {edu.area}
													</h3>
													<p>
														{edu.url ? (
															<ExtLink href={edu.url} className='resume-company'>
																{edu.institution}
															</ExtLink>
														) : (
															edu.institution
														)}
													</p>
													<p className='resume-role-meta'>
														<span>
															<DateRange start={edu.start} end={edu.end} />
														</span>
													</p>
													<p className='resume-role-meta'>{edu.score}</p>
												</div>
											</div>
										))}
									</Section>
								</aside>

								<p className='resume-closing'>
									Thinking about hiring? Let's connect at{' '}
									<ExtLink href={`mailto:${r.email}`} className='resume-link'>
										{r.email}
									</ExtLink>
									.
								</p>
							</div>
						</div>
					</article>
				</ResumeCanvas>
				<script dangerouslySetInnerHTML={{ __html: fitScript }} />
			</section>
			<Footer />
		</AnimatePage>
	);
}
