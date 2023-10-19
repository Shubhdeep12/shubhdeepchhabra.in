'use client'

import Script from 'next/script'

// const pageview = (GA_MEASUREMENT_ID: string, url: string) => {
// 	if (window !== null) {
// 		window.gtag('config', GA_MEASUREMENT_ID, {
// 			page_path: url,
// 		})
// 	}
// }

const GoogleAnalytics = () => {
	// const pathname = usePathname()
	// const searchParams = useSearchParams()

	// useEffect(() => {
	// 	const url = pathname + (searchParams || '').toString()

	// 	pageview(process.env.GA_MEASUREMENT_ID || '', url)
	// }, [pathname, searchParams, process.env.GA_MEASUREMENT_ID])
	return (
		<>
			{console.log('set up google anayltics')}
			<Script
				strategy='afterInteractive'
				src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
			/>
			<Script
				id='gtag-init'
				strategy='afterInteractive'
				dangerouslySetInnerHTML={{
					__html: `
                      window.dataLayer = window.dataLayer || [];
                      function gtag(){dataLayer.push(arguments);}
                      gtag('js', new Date());
                      gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
                      page_path: window.location.pathname,
                      });
                    `,
				}}
			/>
		</>
	)
}

export default GoogleAnalytics
