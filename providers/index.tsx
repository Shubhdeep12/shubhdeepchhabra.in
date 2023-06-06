'use client'

import { ThemeProvider as NextThemeProvider } from 'next-themes'
import { type PropsWithChildren } from 'react'
import { ThemeProvider } from './theme-provider'

const themes = { light: 'light', dark: 'dark' }

export function Providers(props: PropsWithChildren) {
	return (
		<NextThemeProvider attribute={'class'} defaultTheme={'light'} value={themes}>
			<ThemeProvider>{props.children}</ThemeProvider>
		</NextThemeProvider>
	)
}
