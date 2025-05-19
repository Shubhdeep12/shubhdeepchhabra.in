import { Raleway } from 'next/font/google';
import MainContent from '@/src/components/shared/layout/MainContent';
import './globals.css';
import { Providers } from '@/src/providers';
import { BackToTop } from '@/src/components/shared/navigation/BackToTop';
import { type PropsWithChildren } from 'react';
import { Metadata } from 'next';
import { Analytics } from '@vercel/analytics/react';
import { GoogleAnalytics } from '@next/third-parties/google';
import { ThemeProvider } from 'next-themes';
import Navbar from '@/src/components/shared/layout/Navbar';
import Footer from '@/src/components/shared/layout/Footer';

const raleway = Raleway({
	subsets: ['latin'],
	variable: '--font-man',
});

export const metadata: Metadata = {
	title: 'Shubhdeep Chhabra',
	description:
		'Shubhdeep Chhabra is a Software Engineer from India specializing in web development. Explore my portfolio to see innovative solutions for complex problems.',
	applicationName: 'Shubhdeep Chhabra Portfolio',
	authors: [{ name: 'Shubhdeep Chhabra', url: 'https://www.shubhdeepchhabra.in' }],
	keywords: [
		'next.js',
		'react',
		'shubhdeep chhabra',
		'shubhdeep',
		'shubh',
		'web development',
		'software engineer',
		'portfolio',
		'styled-components',
		'tailwindcss',
		'tailwind',
		'html',
		'css',
		'javascript',
		'typescript',
		'semanticui',
		'okshubhh',
	],
	referrer: 'origin',
	creator: 'Shubhdeep Chhabra',
	publisher: 'Shubhdeep Chhabra',
	openGraph: {
		type: 'website',
		description:
			'Shubhdeep Chhabra is a Software Engineer from India specializing in web development. Explore my portfolio to see innovative solutions for complex problems.',
		title: 'Shubhdeep Chhabra',
		locale: 'en_US',
		siteName: 'Shubhdeep Chhabra Portfolio',
		url: 'https://www.shubhdeepchhabra.in/',
		images: [
			{
				url: '/assets/shubhdeep-og.png',
				alt: 'Shubhdeep Chhabra',
				width: '1200',
				height: '474',
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
		site: '@okshubhh',
		creator: '@okshubhh',
		title: 'Shubhdeep Chhabra',
		description:
			'Shubhdeep Chhabra is a Software Engineer from India specializing in web development. Explore my portfolio to see innovative solutions for complex problems.',
		images: ['/assets/shubhdeep-og.png'],
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
};

export default function RootLayout({ children }: PropsWithChildren) {
	return (
		<html lang='en' suppressHydrationWarning>
			<body className={`${raleway.variable} font-sans bg-body-gradient dark:bg-body-gradient-inverted min-h-screen`}>
				<ThemeProvider attribute='class' defaultTheme='system' enableSystem>
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
				</ThemeProvider>
			</body>
		</html>
	);
}
