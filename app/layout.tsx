import { DM_Mono, DM_Sans } from 'next/font/google';
import MainContent from '@/src/components/MainContent';
import './globals.css';
import { GoogleAnalytics } from '@next/third-parties/google';
import { Analytics } from '@vercel/analytics/react';
import { Metadata } from 'next';
import { ThemeProvider } from 'next-themes';
import { type PropsWithChildren } from 'react';
import { Providers } from '@/src/providers';

const dmSans = DM_Sans({
	subsets: ['latin'],
	variable: '--font-dm-sans',
});

const dmMono = DM_Mono({
	weight: ['400'],
	subsets: ['latin'],
	variable: '--font-dm-mono',
});

export const metadata: Metadata = {
	title: 'Shubhdeep Chhabra',
	description:
		'Shubhdeep Chhabra is a Product focussed Software Engineer writing about software engineering, architecture, and practical product lessons.',
	applicationName: 'Shubhdeep Chhabra',
	authors: [{ name: 'Shubhdeep Chhabra', url: 'https://www.shubhdeepchhabra.in' }],
	keywords: [
		'next.js',
		'react',
		'shubhdeep chhabra',
		'shubhdeep',
		'shubh',
		'web development',
		'software engineer',
		'writing',
		'blog',
		'engineering',
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
			'Shubhdeep Chhabra is a Product focussed Software Engineer writing about software engineering, architecture, and practical product lessons.',
		title: 'Shubhdeep Chhabra',
		locale: 'en_US',
		siteName: 'Shubhdeep Chhabra',
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
			'Shubhdeep Chhabra is a Product Engineer writing about software engineering, architecture, and practical product lessons.',
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
			<body className={`${dmSans.variable} ${dmMono.variable} min-h-screen`} suppressHydrationWarning>
				<ThemeProvider attribute='class' defaultTheme='system' enableSystem>
					<Providers>
						<MainContent>{children}</MainContent>
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
