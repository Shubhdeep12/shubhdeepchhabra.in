'use client'

import { usePathname, useSearchParams } from 'next/navigation'
import Script from 'next/script'
import { useEffect } from 'react'

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
	console.log({ date: process.env.GA_MEASUREMENT_ID })
	return (
		<>
			<Script
				async
				src={`https://www.googletagmanager.com/gtag/js?id=${process.env.GA_MEASUREMENT_ID}`}
				strategy='lazyOnload'
			/>
			<Script
				id='google'
				dangerouslySetInnerHTML={{
					__html: ` window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
    
            gtag('config', '${process.env.GA_MEASUREMENT_ID}');`,
				}}
			/>
		</>
	)
}

export default GoogleAnalytics
