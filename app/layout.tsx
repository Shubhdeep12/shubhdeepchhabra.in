import Navbar from '@/components/Navbar/Navbar'
import { Manrope } from 'next/font/google'
import MainContent from '@/components/MainContent'
import './globals.css'
import { Providers } from '@/providers'
import Footer from '@/components/Footer'
import { BackToTop } from '@/components/BackToTop'
import { type PropsWithChildren } from 'react'

const manrope = Manrope({
	subsets: ['latin'],
	variable: '--font-man',
})

export const metadata = {
	title: 'Shubhdeep',
	description: 'Shubhdeep Chhabra - Portfolio',
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
				</Providers>
			</body>
		</html>
	)
}
