import Navbar from '@/components/Navbar/Navbar'
import { Manrope } from 'next/font/google'
import MainContent from '@/components/MainContent'
import './globals.css'
import { Providers } from '@/providers'
import Footer from '@/components/Footer'
import { BackToTop } from '@/components/BackToTop'
import { type PropsWithChildren } from 'react'
import { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/react'
import GoogleAnalytics from '@/components/GoogleAnalytics'

const manrope = Manrope({
	subsets: ['latin'],
	variable: '--font-man',
})

export const metadata: Metadata = {
	title: 'Shubhdeep Chhabra - Software Engineer | Tech Enthusiast',
	description:
		'Software Engineer from India specializing in web development. Passionate about creating innovative solutions for complex problems. Explore my portfolio now!',
	applicationName: 'Shubhdeep Chhabra Portfolio',
	authors: [{ name: 'Shubhdeep Chhabra Portfolio', url: 'https://shubhdeepchhabra.in' }],
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
		title: 'Shubhdeep Chhabra - Software Engineer | Tech Enthusiast',
		locale: 'en_US',
		siteName: 'Shubhdeep Chhabra Portfolio',
		url: 'https://shubhdeepchhabra.in/',
		images: [
			{
				url: '/assets/Shubhdeepchhabra.png',
				alt: 'Shubhdeep Chhabra - Software Engineer | Tech Enthusiast',
				width: '1200',
				height: '630',
			},
		],
	},
	robots: {
		index: false,
		follow: true,
		nocache: true,
		googleBot: {
			index: true,
			follow: false,
			noimageindex: true,
		},
	},
	twitter: {
		card: 'summary_large_image',
		site: '@ShubhInTech',
		creator: '@ShubhInTech',
		title: 'Shubhdeep Chhabra - Software Engineer | Tech Enthusiast',
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
			<body
				className={`${manrope.variable} font-sans bg-background-primary-light dark:bg-background-primary-dark min-h-screen`}
			>
				<Providers>
					<Navbar />
					<MainContent>{children}</MainContent>
					<Footer />
					<BackToTop />
					<GoogleAnalytics />
					<Analytics />
				</Providers>
			</body>
		</html>
	)
}
