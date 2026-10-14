/**
 * Single source of truth for the resume. The /resume page, /resume.md, /resume.json
 * and the JSON-LD on the page are all generated from this, so edit here only.
 */

export const SITE_URL = 'https://okshubh.in';
export const RESUME_PDF_PATH = '/resume/Shubhdeep_Chhabra.pdf';
export const RESUME_MD_PATH = '/resume.md';
export const RESUME_JSON_PATH = '/resume.json';

/** Text with optional inline links: plain strings and { text, href } runs. */
export type Inline = (string | { text: string; href: string })[];

export type ResumeLink = { label: string; href: string; network?: string };

export type ResumeRole = {
	company: string;
	companyUrl?: string;
	title: string;
	/** Short badge shown in place of a logo, e.g. 'ATC'. */
	initials: string;
	/** Optional logo in /public, replaces the initials badge. */
	logo?: string;
	location: string;
	/** Tech/focus line under the role. */
	stack: string[];
	/** YYYY-MM */
	start: string;
	/** YYYY-MM, or undefined while current. */
	end?: string;
	highlights: Inline[];
};

export type ResumeSkillGroup = { name: string; keywords: string[] };

export type ResumeProject = {
	name: string;
	/** Optional trailing link after the name, e.g. "— github". */
	link?: { text: string; href: string };
	highlights: Inline[];
};

export type ResumeEducation = {
	institution: string;
	url?: string;
	studyType: string;
	area: string;
	start: string;
	end: string;
	score: string;
};

const merged = (repo: string) => `https://github.com/${repo}/pulls?q=is%3Apr+is%3Amerged+author%3AShubhdeep12`;

export type Resume = {
	name: string;
	label: string;
	email: string;
	location: { label: string; country: string; countryCode: string };
	links: ResumeLink[];
	summary: string;
	experience: ResumeRole[];
	skills: ResumeSkillGroup[];
	openSource: ResumeProject[];
	education: ResumeEducation[];
};

export const RESUME: Resume = {
	name: 'Shubhdeep Chhabra',
	label: 'Senior Software Engineer',
	email: 'chhabrashubhdeep@gmail.com',
	// The phone number is only stamped into the PDF (see scripts/resume-pdf.mjs), never served on the web.
	location: { label: 'India · Remote', country: 'India', countryCode: 'IN' },
	links: [
		{ label: 'okshubh.in', href: SITE_URL },
		{ label: 'github/Shubhdeep12', href: 'https://github.com/Shubhdeep12', network: 'GitHub' },
		{
			label: 'linkedin/shubhdeepchhabra',
			href: 'https://www.linkedin.com/in/shubhdeepchhabra/',
			network: 'LinkedIn',
		},
	],
	summary:
		'Software Engineer with 5+ years of experience building multi-tenant SaaS products for enterprise customers. Built features across authentication, authorization, content management, developer experience and AI-assisted workflows. Interested in product engineering, platform development and open-source software.',
	experience: [
		{
			company: 'American Technology Consulting (ATC)',
			title: 'Senior Software Engineer',
			location: 'Remote',
			initials: 'ATC',
			stack: ['React 18', 'Rsbuild', 'TypeScript', 'LMS'],
			start: '2026-04',
			highlights: [
				[
					'Led migration of a large React application from React 16, CRA and CRACO to React 18 and Rsbuild, reducing CI build times by 60% and simplifying the development workflow.',
				],
				[
					'Worked across the LMS platform to stabilize existing features, address technical debt and support ongoing product development after the engineering transition.',
				],
			],
		},
		{
			company: 'Auzmor Technology Pvt. Ltd.',
			companyUrl: 'https://auzmor.com',
			title: 'Senior Software Engineer',
			location: 'Remote',
			initials: 'AZ',
			stack: ['React', 'TypeScript', 'RBAC', 'SSO/SAML', 'AI workflows'],
			start: '2025-01',
			end: '2026-03',
			highlights: [
				[
					'Built a multi-tenant RBAC platform used across 50+ enterprise organizations, allowing administrators to create custom roles and manage access across product modules.',
				],
				[
					'Implemented SSO/SAML integrations, API key management and user provisioning workflows to simplify enterprise onboarding and identity management.',
				],
				[
					'Built an AI-powered content generation workflow that created structured learning material from prompts and uploaded documents, reducing manual content creation effort.',
				],
			],
		},
		{
			company: 'Auzmor Technology Pvt. Ltd.',
			companyUrl: 'https://auzmor.com',
			title: 'Software Engineer III',
			location: 'Remote',
			initials: 'AZ',
			stack: ['React', 'Performance', 'WCAG 2.1 AA', 'Mentoring'],
			start: '2023-01',
			end: '2024-12',
			highlights: [
				[
					'Built Mentorship, Interactive Training and Checklist experiences used by enterprise learners, helping increase platform engagement by 50%.',
				],
				[
					'Led frontend performance improvements through lazy loading, code splitting and bundle optimization, improving Core Web Vitals scores from 20 to 85.',
				],
				[
					'Improved accessibility across the platform by implementing WCAG 2.1 AA standards and partnering closely with design and product teams.',
				],
				[
					'Led engineering design reviews, mentored developers, and established code review standards to improve code quality and maintainability.',
				],
			],
		},
		{
			company: 'Auzmor Technology Pvt. Ltd.',
			companyUrl: 'https://auzmor.com',
			title: 'Software Engineer I',
			location: 'Remote',
			initials: 'AZ',
			stack: ['React', 'REST APIs', 'WebSockets', 'MFA'],
			start: '2021-12',
			end: '2022-12',
			highlights: [
				[
					'Built a multi-tenant branding system that allowed organizations to customize themes and deliver white-labeled learning experiences.',
				],
				[
					'Built social learning features including posts, polls and eSignatures using React, REST APIs and Web Sockets.',
				],
				['Implemented multi-factor authentication using SMS and email verification to strengthen platform security.'],
			],
		},
		{
			company: 'Accenture Solutions Pvt. Ltd.',
			companyUrl: 'https://www.accenture.com',
			title: 'Associate Software Engineer',
			location: 'Gurugram, Haryana, India',
			initials: 'AC',
			stack: ['React', 'JavaScript', 'Java', 'SQL'],
			start: '2021-01',
			end: '2021-12',
			highlights: [
				[
					'Developed and maintained enterprise web applications using React, JavaScript, Java, HTML, SQL, and REST APIs while collaborating with cross-functional teams.',
				],
			],
		},
	],
	skills: [
		{ name: 'Languages', keywords: ['JavaScript (ES6+)', 'TypeScript', 'Java', 'HTML5', 'CSS3'] },
		{
			name: 'Frontend',
			keywords: ['React', 'Next.js', 'Redux Toolkit', 'React Query', 'Tailwind CSS', 'Responsive UI Development'],
		},
		{ name: 'Backend', keywords: ['Node.js', 'REST APIs'] },
		{ name: 'Auth & Security', keywords: ['OAuth', 'SSO/SAML', 'RBAC', 'MFA'] },
		{
			name: 'Performance & Accessibility',
			keywords: ['Core Web Vitals', 'Code Splitting', 'Lazy Loading', 'WCAG 2.1 AA'],
		},
		{ name: 'Cloud & Data', keywords: ['AWS', 'MySQL', 'CI/CD'] },
		{ name: 'Architecture', keywords: ['Multi-tenant Systems', 'Design Systems', 'Microfrontends', 'Monorepos'] },
		{
			name: 'Collaboration',
			keywords: ['Code Reviews', 'Technical Mentorship', 'Cross-functional Collaboration', 'Agile Development'],
		},
		{ name: 'AI & Developer Tooling', keywords: ['AI-powered Content Generation', 'MCP'] },
	],
	openSource: [
		{
			name: 'Resend (CLI + MCP Server)',
			highlights: [
				[
					'Contributed features and test coverage improvements to the official Resend ',
					{ text: 'MCP Server', href: merged('resend/resend-mcp') },
					' and ',
					{
						text: 'CLI',
						href: 'https://github.com/resend/resend-cli/pulls?q=is%3Apr+author%3AShubhdeep12+is%3Aclosed',
					},
				],
				[
					'Built a personal open-source ',
					{ text: 'CLI', href: 'https://www.npmjs.com/package/@shubhdeep12/resend-cli' },
					' for terminal-based Resend API interactions.',
				],
			],
		},
		{
			name: 'Sentry Spotlight',
			link: { text: 'github', href: merged('getsentry/spotlight') },
			highlights: [
				['Contributed improvements to Sentry Spotlight, an open-source local debugging and observability tool.'],
			],
		},
		{
			name: 'Enterprise Design Systems',
			highlights: [
				[
					'Contributed merged improvements to ',
					{ text: 'Kobalte', href: merged('kobaltedev/kobalte') },
					', ',
					{ text: 'Razorpay Blade', href: merged('razorpay/blade') },
					', ',
					{ text: 'Microsoft Griffel', href: merged('microsoft/griffel') },
					' and ',
					{ text: 'Adobe React Spectrum', href: merged('adobe/react-spectrum') },
					'.',
				],
			],
		},
	],
	education: [
		{
			institution: 'Jaipur Engineering College and Research Center',
			url: 'https://jecrc.ac.in',
			studyType: 'B.Tech',
			area: 'Electronics and Communication Engineering',
			start: '2016-08',
			end: '2020-08',
			score: 'CGPA: 7.2/10',
		},
	],
};

const MONTHS = [
	'January',
	'February',
	'March',
	'April',
	'May',
	'June',
	'July',
	'August',
	'September',
	'October',
	'November',
	'December',
];

/** '2026-04' → 'April 2026' */
export const formatMonth = (ym: string) => {
	const [year, month] = ym.split('-').map(Number);
	return `${MONTHS[month - 1]} ${year}`;
};

export const formatRange = (start: string, end?: string) =>
	`${formatMonth(start)} – ${end ? formatMonth(end) : 'Present'}`;

/** Inclusive month count → '1 yr 3 mos'. Open-ended roles count up to `now`. */
export const formatDuration = (start: string, end?: string, now = new Date()) => {
	const [sy, sm] = start.split('-').map(Number);
	const [ey, em] = end ? end.split('-').map(Number) : [now.getFullYear(), now.getMonth() + 1];
	const total = (ey - sy) * 12 + (em - sm) + 1;
	const years = Math.floor(total / 12);
	const months = total % 12;
	const part = (n: number, unit: string) => (n ? `${n} ${unit}${n > 1 ? 's' : ''}` : '');
	return [part(years, 'yr'), part(months, 'mo')].filter(Boolean).join(' ') || '1 mo';
};

export const inlineToText = (inline: Inline) =>
	inline.map((run) => (typeof run === 'string' ? run : run.text)).join('');

const inlineToMarkdown = (inline: Inline) =>
	inline.map((run) => (typeof run === 'string' ? run : `[${run.text}](${run.href})`)).join('');

const mdLink = (text: string, href?: string) => (href ? `[${text}](${href})` : text);

export function resumeToMarkdown() {
	const r = RESUME;
	const lines: string[] = [
		`# ${r.name}`,
		'',
		`${r.label} · ${r.location.label}`,
		'',
		...r.links.map((link) => `- ${link.network ?? 'Website'}: [${link.label}](${link.href})`),
		`- Email: [${r.email}](mailto:${r.email})`,
		`- PDF: ${SITE_URL}${RESUME_PDF_PATH}`,
		'',
		'## Summary',
		'',
		r.summary,
		'',
		'## Experience',
	];

	for (const role of r.experience) {
		lines.push(
			'',
			`### ${role.title} · ${mdLink(role.company, role.companyUrl)}`,
			'',
			`*${formatRange(role.start, role.end)} · ${role.location}* — ${role.stack.join(', ')}`,
			'',
			...role.highlights.map((h) => `- ${inlineToMarkdown(h)}`)
		);
	}

	lines.push('', '## Skills', '', ...r.skills.map((group) => `- **${group.name}:** ${group.keywords.join(', ')}`));

	lines.push('', '## Open Source');
	for (const project of r.openSource) {
		const link = project.link ? ` — ${mdLink(project.link.text, project.link.href)}` : '';
		lines.push('', `### ${project.name}${link}`, '', ...project.highlights.map((h) => `- ${inlineToMarkdown(h)}`));
	}

	lines.push('', '## Education');
	for (const edu of r.education) {
		lines.push(
			'',
			`### ${mdLink(edu.institution, edu.url)}`,
			'',
			`${edu.studyType} in ${edu.area} · ${formatRange(edu.start, edu.end)} · ${edu.score}`
		);
	}

	return `${lines.join('\n')}\n`;
}

/** JSON Resume (https://jsonresume.org/schema) */
export function resumeToJsonResume() {
	const r = RESUME;
	return {
		$schema: 'https://raw.githubusercontent.com/jsonresume/resume-schema/v1.0.0/schema.json',
		basics: {
			name: r.name,
			label: r.label,
			email: r.email,
			url: SITE_URL,
			summary: r.summary,
			location: { countryCode: r.location.countryCode },
			profiles: r.links
				.filter((link) => link.network)
				.map((link) => ({
					network: link.network,
					username: link.label.split('/')[1],
					url: link.href,
				})),
		},
		work: r.experience.map((role) => ({
			name: role.company,
			...(role.companyUrl ? { url: role.companyUrl } : {}),
			position: role.title,
			location: role.location,
			startDate: role.start,
			...(role.end ? { endDate: role.end } : {}),
			highlights: role.highlights.map(inlineToText),
		})),
		education: r.education.map((edu) => ({
			institution: edu.institution,
			url: edu.url,
			area: edu.area,
			studyType: edu.studyType,
			startDate: edu.start,
			endDate: edu.end,
			score: edu.score,
		})),
		skills: r.skills,
		projects: r.openSource.map((project) => ({
			name: project.name,
			highlights: project.highlights.map(inlineToText),
			...(project.link ? { url: project.link.href } : {}),
		})),
		meta: {
			canonical: `${SITE_URL}${RESUME_JSON_PATH}`,
			version: 'v1.0.0',
		},
	};
}

export const PERSON_ID = `${SITE_URL}/#person`;

/** schema.org ProfilePage → Person, for search engines and agents reading the page. */
export function resumeToJsonLd() {
	const r = RESUME;
	const current = r.experience.find((role) => !role.end);
	const org = (name: string, url?: string) => ({ '@type': 'Organization', name, ...(url ? { url } : {}) });
	const pastEmployers = r.experience.filter(
		(role, i, all) =>
			role.end && role.company !== current?.company && all.findIndex((x) => x.company === role.company) === i
	);

	return {
		'@context': 'https://schema.org',
		'@type': 'ProfilePage',
		'@id': `${SITE_URL}/resume`,
		url: `${SITE_URL}/resume`,
		name: `${r.name} — Resume`,
		mainEntity: {
			'@type': 'Person',
			'@id': PERSON_ID,
			name: r.name,
			url: SITE_URL,
			email: `mailto:${r.email}`,
			jobTitle: r.label,
			description: r.summary,
			nationality: { '@type': 'Country', name: r.location.country },
			sameAs: [...r.links.filter((link) => link.network).map((link) => link.href), 'https://x.com/okshubhh'],
			...(current ? { worksFor: org(current.company, current.companyUrl) } : {}),
			alumniOf: [
				...r.education.map((edu) => ({ '@type': 'CollegeOrUniversity', name: edu.institution, url: edu.url })),
				...pastEmployers.map((role) => org(role.company, role.companyUrl)),
			],
			hasCredential: r.education.map((edu) => ({
				'@type': 'EducationalOccupationalCredential',
				credentialCategory: 'degree',
				name: `${edu.studyType} in ${edu.area}`,
				recognizedBy: { '@type': 'CollegeOrUniversity', name: edu.institution },
			})),
			hasOccupation: {
				'@type': 'Occupation',
				name: r.label,
				skills: r.skills.flatMap((group) => group.keywords).join(', '),
			},
			knowsAbout: r.skills.flatMap((group) => group.keywords),
		},
	};
}
