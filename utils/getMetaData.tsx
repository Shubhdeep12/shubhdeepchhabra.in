const DOMAIN = process.env.DOMAIN
const DEFAULT_OG_IMAGE = '/assets/Shubhdeepchhabra.png'

export default function getMetaData({
	title = 'Shubhdeep Chhabra',
	description = 'Software engineer from India, specializing in	web development. With a passion for creating things on the web, I graduated in 2020 and have since dedicated myself to honing my skills. I thrive on challenging projects and enjoy finding innovative solutions to complex problems. Alongside my work, I actively contribute to Open Source Projects, embracing the collaborative nature of the tech community. With strong problem-solving abilities and attention to detail, I strive to deliver high-quality, user-friendly solutions.',
	siteName = 'Shubhdeep Chhabra',
	canonical = DOMAIN,
	ogImage = DEFAULT_OG_IMAGE,
	ogType = 'website',
	twitterHandle = '@ShubhInTech',
}) {
	return {
		title,
		description,
		openGraph: {
			type: ogType,
			description,
			title,
			locale: 'en_US',
			siteName,
			url: canonical ?? DOMAIN,
			images: [
				{
					url: ogImage ?? DEFAULT_OG_IMAGE,
					alt: `${title}`,
					width: '1200',
					height: '630',
				},
			],
		},
		robots: {
			index: true,
			follow: true,
		},
		twitter: {
			card: 'summary_large_image',
			site: twitterHandle,
			creator: twitterHandle,
			title,
			description,
			images: [ogImage ?? DEFAULT_OG_IMAGE],
		},
		icons: {
			shortcut: '/favicon.ico',
		},
	}
}
