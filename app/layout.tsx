import Navbar from '@/components/Navbar/Navbar'
import { Manrope } from 'next/font/google'
import Main from '@/components/Main'
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
					<Main>{children}</Main>
				</Providers>
			</body>
		</html>
	)
}
