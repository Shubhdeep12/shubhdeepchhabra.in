const DOMAIN = process.env.DOMAIN
const DEFAULT_OG_IMAGE = '/assets/Shubhdeepchhabra.png'

export default function getMetaData({
	title = 'Shubhdeep Chhabra - Software Engineer | Tech Enthusiast',
	description = 'Software Engineer from India specializing in web development. Passionate about creating innovative solutions for complex problems. Explore my portfolio now!',
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
