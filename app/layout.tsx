import Navbar from '@/components/Navbar/Navbar'
import { Manrope } from 'next/font/google'
import MainContent from '@/components/MainContent'
import './globals.css'
import { Providers } from '@/providers'

const manrope = Manrope({
	subsets: ['latin'],
	variable: '--font-man',
})

export const metadata = {
	title: 'Shubhdeep',
	description: 'Shubhdeep Chhabra - Portfolio',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang='en'>
			<body className={`${manrope.variable} font-sans bg-background-primary-light dark:bg-background-primary-dark`}>
				<Providers>
					<Navbar />
					<MainContent>{children}</MainContent>
				</Providers>
			</body>
		</html>
	)
}
