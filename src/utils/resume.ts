/**
 * Single source of truth for the resume. The /resume page, /resume.md, /resume.json
 * and the JSON-LD on the page are all generated from this, so edit here only.
 */

export const SITE_URL = 'https://okshubh.in';
export const RESUME_PDF_PATH = '/resume/Shubhdeep_Chhabra.pdf';
export const RESUME_MD_PATH = '/resume.md';
export const RESUME_JSON_PATH = '/resume.json';

/** Text with optional inline links: plain strings and { text, href } runs. */
/** Text runs: plain strings, { strong } for emphasis, and links that can carry a small logo image. */
export type Inline = (string | { strong: string } | { text: string; href: string; logo?: string })[];

/** 'Cut build times by **60%**' → Inline with the starred parts bold. */
const rich = (text: string): Inline =>
	text
		.split(/\*\*(.+?)\*\*/)
		.map((part, i) => (i % 2 ? { strong: part } : part))
		.filter((part) => part !== '');

export type ResumeLink = { label: string; href: string; network?: string };

export type ResumeRole = {
	company: string;
	companyUrl?: string;
	title: string;
	/** Short badge shown in place of a logo, e.g. 'ATC'. */
	initials: string;
	/** Official logo image in /public (used as is, never recoloured). Falls back to initials. */
	logo?: string;
	location: string;
	/** Tech/focus line under the role. */
	stack: string[];
	/** YYYY-MM */
	start: string;
	/** YYYY-MM, or undefined while current. */
	end?: string;
	/** Optional context line shown above the highlights. */
	note?: string;
	highlights: Inline[];
};

export type ResumeSkillGroup = { name: string; keywords: string[] };

export type ResumeProject = {
	name: string;
	/** Official logo image in /public, or 'design-systems' for a generic icon. */
	logo?: string;
	/** Optional trailing link after the name, e.g. "— github". */
	link?: { text: string; href: string };
	highlights: Inline[];
};

export type ResumeEducation = {
	institution: string;
	logo?: string;
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
	label: 'Product Engineer · Frontend, Enterprise SaaS & Agentic AI',
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
		'Product engineer who figures things out. 5+ years building multi-tenant enterprise SaaS with React and TypeScript, turning ambiguity into shipped features: granular permissions for 50+ organizations, Lighthouse 20 to 85, and 60% faster CI builds. Open-source contributor to Resend and Sentry; now co-designing agentic test automation.',
	experience: [
		{
			company: 'American Technology Consulting (ATC)',
			companyUrl: 'https://atc.xyz',
			logo: '/resume/logos/atc.png',
			title: 'Senior Software Engineer',
			location: 'Remote',
			initials: 'ATC',
			stack: ['React 18', 'Rsbuild', 'TypeScript', 'LMS', 'Multi-agent AI'],
			start: '2026-04',
			note: "Auzmor's engineering team moved to ATC (same ownership); continuing to build the Auzmor LMS platform.",
			highlights: [
				rich(
					'Led migration from React 16/CRA/CRACO to **React 18 and Rsbuild**, cutting CI build time by **60%**.'
				),
				rich(
					'Co-designing a **multi-agent test automation system**: a goal-based explorer agent builds a product map of the web app, test cases are generated from it, and an executor agent runs them (in active development).'
				),
			],
		},
		{
			company: 'Auzmor Technology Pvt. Ltd.',
			companyUrl: 'https://auzmor.com',
			logo: '/resume/logos/auzmor.jpg',
			title: 'Senior Software Engineer',
			location: 'Remote',
			initials: 'AZ',
			stack: ['React', 'TypeScript', 'RBAC', 'SSO/SAML', 'AI workflows'],
			start: '2025-01',
			end: '2026-03',
			highlights: [
				rich(
					'Moved a role-only B2B product to **granular CRUD permissions**: mapped every app feature to permissions and built frontend enforcement, enabling custom roles for **50+ enterprise organizations**.'
				),
				rich('Built frontend flows for **SSO/SAML**, **API key management** and user provisioning.'),
				rich(
					'Built the **AI-powered content generation** UI turning prompts and documents into learning material.'
				),
			],
		},
		{
			company: 'Auzmor Technology Pvt. Ltd.',
			companyUrl: 'https://auzmor.com',
			logo: '/resume/logos/auzmor.jpg',
			title: 'Software Engineer III',
			location: 'Remote',
			initials: 'AZ',
			stack: ['React', 'Performance', 'WCAG 2.1 AA', 'Mentoring'],
			start: '2023-01',
			end: '2024-12',
			highlights: [
				rich(
					'Built Mentorship, Interactive Training and Checklist features, helping increase platform engagement by **50%**.'
				),
				rich(
					'Raised the **Lighthouse performance score from 20 to 85** through code splitting and bundle optimization.'
				),
				rich(
					'Implemented **WCAG 2.1 AA** accessibility standards across the platform with design and product teams.'
				),
				rich(
					'Led **engineering design reviews**, mentored developers and set code review standards for the team.'
				),
			],
		},
		{
			company: 'Auzmor Technology Pvt. Ltd.',
			companyUrl: 'https://auzmor.com',
			logo: '/resume/logos/auzmor.jpg',
			title: 'Software Engineer I',
			location: 'Remote',
			initials: 'AZ',
			stack: ['React', 'REST APIs', 'WebSockets', 'MFA'],
			start: '2021-12',
			end: '2022-12',
			highlights: [
				rich(
					'Built a **multi-tenant branding system** for custom themes and white-labeled learning experiences.'
				),
				rich(
					'Built **social learning features** (posts, polls, eSignatures) using React, REST APIs and WebSockets.'
				),
				rich(
					'Built **multi-factor authentication** flows using SMS and email verification to strengthen platform security.'
				),
			],
		},
		{
			company: 'Accenture Solutions Pvt. Ltd.',
			companyUrl: 'https://www.accenture.com',
			logo: '/resume/logos/accenture.svg',
			title: 'Associate Software Engineer',
			location: 'Gurugram, Haryana, India',
			initials: 'AC',
			stack: ['React', 'JavaScript', 'Java', 'SQL'],
			start: '2021-01',
			end: '2021-12',
			highlights: [
				rich(
					'Built and maintained **enterprise web applications** using React, JavaScript, Java, SQL and REST APIs.'
				),
			],
		},
	],
	skills: [
		{ name: 'Languages', keywords: ['JavaScript (ES6+)', 'TypeScript', 'HTML5', 'CSS3'] },
		{ name: 'Frontend', keywords: ['React', 'Next.js', 'Redux Toolkit', 'React Query', 'Tailwind CSS'] },
		{
			name: 'Enterprise SaaS',
			keywords: ['Multi-tenancy', 'RBAC & Permissions', 'SSO/SAML', 'OAuth', 'MFA', 'API Key Management'],
		},
		{
			name: 'Performance & Accessibility',
			keywords: ['Lighthouse', 'Core Web Vitals', 'Code Splitting', 'Lazy Loading', 'WCAG 2.1 AA'],
		},
		{
			name: 'Architecture & Tooling',
			keywords: ['Design Systems', 'Microfrontends', 'Monorepos', 'Rsbuild', 'CI/CD'],
		},
		{ name: 'APIs & Node', keywords: ['REST APIs', 'WebSockets', 'Node.js (CLIs and tooling)'] },
		{
			name: 'Agentic AI',
			keywords: ['LLM Agents', 'Multi-agent Systems', 'MCP', 'Agent Skills & Plugins'],
		},
	],
	openSource: [
		{
			name: 'Resend (CLI + MCP Server)',
			logo: '/resume/logos/resend.svg',
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
			logo: '/resume/logos/sentry.png',
			link: { text: 'github', href: merged('getsentry/spotlight') },
			highlights: [
				['Contributed improvements to Sentry Spotlight, an open-source local debugging and observability tool.'],
			],
		},
		{
			name: 'Enterprise Design Systems',
			logo: 'design-systems',
			highlights: [
				[
					'Contributed merged improvements to ',
					{ text: 'Kobalte', href: merged('kobaltedev/kobalte'), logo: '/resume/logos/kobalte.png' },
					', ',
					{ text: 'Razorpay Blade', href: merged('razorpay/blade'), logo: '/resume/logos/razorpay.svg' },
					', ',
					{ text: 'Microsoft Griffel', href: merged('microsoft/griffel'), logo: '/resume/logos/microsoft.png' },
					' and ',
					{ text: 'Adobe React Spectrum', href: merged('adobe/react-spectrum'), logo: '/resume/logos/adobe.png' },
					'.',
				],
			],
		},
	],
	education: [
		{
			institution: 'Jaipur Engineering College and Research Center',
			url: 'https://jecrc.ac.in',
			logo: '/resume/logos/jecrc.jpg',
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
	inline.map((run) => (typeof run === 'string' ? run : 'strong' in run ? run.strong : run.text)).join('');

const inlineToMarkdown = (inline: Inline) =>
	inline
		.map((run) =>
			typeof run === 'string' ? run : 'strong' in run ? `**${run.strong}**` : `[${run.text}](${run.href})`
		)
		.join('');

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
			...(role.note ? [`*${role.note}*`, ''] : []),
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
