import Navbar from '@/components/Navbar'
import { Raleway } from 'next/font/google'
import MainContent from '@/components/MainContent'
import './globals.css'
import { Providers } from '@/providers'
import Footer from '@/components/Footer'
import { BackToTop } from '@/components/BackToTop'
import { type PropsWithChildren } from 'react'
import { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/react'
// import GoogleAnalytics from '@/components/GoogleAnalytics'
import { GoogleAnalytics } from '@next/third-parties/google'

const raleway = Raleway({
	subsets: ['latin'],
	variable: '--font-man',
})

export const metadata: Metadata = {
	title: 'Shubhdeep Chhabra',
	description:
		'Software Engineer from India specializing in web development. Passionate about creating innovative solutions for complex problems. Explore my portfolio now!',
	applicationName: 'Shubhdeep Chhabra Portfolio',
	authors: [{ name: 'Shubhdeep Chhabra Portfolio', url: 'https://www.shubhdeepchhabra.in' }],
	keywords: [
		'next.js',
		'react',
		'shubhdeep chhabra',
		'shubhdeep',
		'shubh',
		'styled-components',
		'tailwindcss',
		'tailwind',
		'html',
		'css',
		'javascript',
		'typescript',
		'semanticui',
		'shubhintech',
	],
	referrer: 'origin',
	creator: 'Shubhdeep Chhabra',
	publisher: 'Shubhdeep Chhabra',
	openGraph: {
		type: 'website',
		description:
			'Software Engineer from India specializing in web development. Passionate about creating innovative solutions for complex problems. Explore my portfolio now!',
		title: 'Shubhdeep Chhabra',
		locale: 'en_US',
		siteName: 'Shubhdeep Chhabra Portfolio',
		url: 'https://www.shubhdeepchhabra.in/',
		images: [
			{
				url: '/assets/Shubhdeepchhabra.png',
				alt: 'Shubhdeep Chhabra',
				width: '1200',
				height: '630',
			},
		],
	},
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			'max-video-preview': -1,
			'max-image-preview': 'large',
			'max-snippet': -1,
		},
	},
	twitter: {
		card: 'summary_large_image',
		site: '@ShubhInTech',
		creator: '@ShubhInTech',
		title: 'Shubhdeep Chhabra',
		description:
			'Software Engineer from India specializing in web development. Passionate about creating innovative solutions for complex problems. Explore my portfolio now!',
		images: ['/assets/Shubhdeepchhabra.png'],
	},
	icons: {
		icon: '/favicon.ico',
		shortcut: '/favicon.ico',
		apple: '/apple-touch-icon.png',
		other: {
			rel: 'apple-touch-icon-precomposed',
			url: '/apple-touch-icon.png',
		},
	},
}

export default function RootLayout({ children }: PropsWithChildren) {
	return (
		<html lang='en'>
			<body className={`${raleway.variable} font-sans bg-body-gradient dark:bg-body-gradient-inverted min-h-screen`}>
				<Providers>
					<Navbar />
					<MainContent>{children}</MainContent>
					<Footer />
					<BackToTop />
					<Analytics />
					{process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS || process.env.GOOGLE_ANALYTICS ? (
						<GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS || process.env.GOOGLE_ANALYTICS || ''} />
					) : null}
				</Providers>
			</body>
		</html>
	)
}
