'use client';

import { ThemeProvider as NextThemeProvider } from 'next-themes';
import { useEffect, type PropsWithChildren } from 'react';
import { ThemeProvider } from './theme-provider';

const themes = { light: 'light', dark: 'dark' };

export function Providers(props: PropsWithChildren) {
	// useEffect(() => {
	// 	if ('serviceWorker' in navigator) {
	// 		navigator.serviceWorker.register('/service-worker.js').then(
	// 			(registration) => {
	// 				console.log('Service Worker registration successful with scope: ', registration.scope);
	// 			},
	// 			(error) => {
	// 				console.log('Service Worker registration failed: ', error);
	// 			}
	// 		);
	// 	}
	// }, []);
	return (
		<NextThemeProvider attribute={'class'} defaultTheme={'light'} value={themes}>
			<ThemeProvider>{props.children}</ThemeProvider>
		</NextThemeProvider>
	);
}
