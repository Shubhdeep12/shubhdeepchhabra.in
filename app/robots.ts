export default function robots() {
	return {
		rules: [
			{
				userAgent: '*',
			},
		],
		sitemap: `${process.env.DOMAIN}/sitemap.xml`,
		host: process.env.DOMAIN,
	}
}
