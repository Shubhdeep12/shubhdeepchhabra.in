import { Metadata } from 'next';
import Link from 'next/link';
import { Fragment } from 'react';
import AnimatePage from '@/src/components/AnimatePage';
import Footer from '@/src/components/Footer';
import ResumeActions from '@/src/components/resume/ResumeActions';
import {
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
					<ExtLink key={i} href={run.href} className='resume-link resume-link--ext'>
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
		<span className='resume-meta'>
			<time dateTime={start}>{from}</time> – {end ? <time dateTime={end}>{to}</time> : to}
		</span>
	);
}

function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
	return (
		<section className='resume-section' aria-labelledby={id}>
			<h2 id={id} className='resume-section-title'>
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
			<section className='blog-page resume-page'>
				<div className='resume-topbar'>
					<Link href='/' className='blog-home-link'>
						Shubhdeep Chhabra
					</Link>
					<ResumeActions markdown={resumeToMarkdown()} />
				</div>

				<article className='resume-sheet'>
					<header className='resume-header'>
						<h1 className='resume-name'>{r.name}</h1>
						<div className='resume-contact'>
							<ul className='resume-contact-col'>
								{r.links.map((link) => (
									<li key={link.href}>
										<ExtLink href={link.href} className='resume-link resume-link--ext'>
											{link.label}
										</ExtLink>
									</li>
								))}
							</ul>
							<ul className='resume-contact-col resume-contact-col--end'>
								<li>
									<span className='resume-contact-key'>Email</span>{' '}
									<ExtLink href={`mailto:${r.email}`} className='resume-link'>
										{r.email}
									</ExtLink>
								</li>
								<li>
									<span className='resume-contact-key'>Mobile</span>{' '}
									<a href={`tel:${r.phone.replace(/-/g, '')}`} className='resume-link'>
										{r.phone}
									</a>
								</li>
							</ul>
						</div>
					</header>

					<Section id='summary' title='Summary'>
						<p className='resume-summary'>{r.summary}</p>
					</Section>

					<Section id='experience' title='Experience'>
						<ul className='resume-entries'>
							{r.experience.map((role) => (
								<li key={`${role.company}-${role.start}`} className='resume-entry'>
									<div className='resume-entry-row'>
										<h3 className='resume-entry-title'>
											{role.companyUrl ? (
												<ExtLink href={role.companyUrl} className='resume-link'>
													{role.company}
												</ExtLink>
											) : (
												role.company
											)}
										</h3>
										<span className='resume-meta'>{role.location}</span>
									</div>
									<div className='resume-entry-row'>
										<span className='resume-entry-sub'>{role.title}</span>
										<DateRange start={role.start} end={role.end} />
									</div>
									<ul className='resume-bullets'>
										{role.highlights.map((h, i) => (
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
						<ul className='resume-entries resume-skills'>
							{r.skills.map((group) => (
								<li key={group.name}>
									<strong>{group.name}:</strong> {group.keywords.join(', ')}
								</li>
							))}
						</ul>
					</Section>

					<Section id='open-source' title='Open Source'>
						<ul className='resume-entries'>
							{r.openSource.map((project) => (
								<li key={project.name} className='resume-entry'>
									<h3 className='resume-entry-title'>
										{project.name}
										{project.link ? (
											<>
												{' '}
												<span className='resume-entry-sep'>—</span>{' '}
												<ExtLink href={project.link.href} className='resume-link resume-link--ext'>
													{project.link.text}
												</ExtLink>
											</>
										) : null}
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

					<Section id='education' title='Education'>
						<ul className='resume-entries'>
							{r.education.map((edu) => (
								<li key={edu.institution} className='resume-entry'>
									<div className='resume-entry-row'>
										<h3 className='resume-entry-title'>
											{edu.url ? (
												<ExtLink href={edu.url} className='resume-link'>
													{edu.institution}
												</ExtLink>
											) : (
												edu.institution
											)}
										</h3>
										<DateRange start={edu.start} end={edu.end} />
									</div>
									<div className='resume-entry-row'>
										<span className='resume-entry-sub'>
											{edu.studyType} in {edu.area}
										</span>
										<span className='resume-meta'>{edu.score}</span>
									</div>
								</li>
							))}
						</ul>
					</Section>
				</article>

				<p className='resume-agent-note'>
					Reading this as an agent? The same resume is available as <a href={RESUME_MD_PATH}>Markdown</a> and{' '}
					<a href={RESUME_JSON_PATH}>JSON Resume</a>, or request this page with <code>Accept: text/markdown</code>.
				</p>
			</section>
			<Footer />
		</AnimatePage>
	);
}
