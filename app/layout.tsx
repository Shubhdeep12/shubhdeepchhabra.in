import Navbar from '@/components/Navbar/Navbar'
import './globals.css'
import { Manrope } from 'next/font/google'
import Main from '@/components/Main'

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
			<body className={`${manrope.variable} font-sans`}>
				<Navbar />
				<Main>{children}</Main>
			</body>
		</html>
	)
}
