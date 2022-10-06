import { ThemeProvider as NextThemeProvider } from 'next-themes';
import { globalStyles, darkTheme } from '../../stiches.config';

import { ThemeProvider } from '../providers/theme';
import type { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
  globalStyles();
  return (
    <NextThemeProvider
      attribute="class"
      defaultTheme="system"
      value={{
        light: 'light',
        dark: darkTheme.className,
      }}
    >
      <ThemeProvider>
        <Component {...pageProps} />
      </ThemeProvider>
    </NextThemeProvider>
  );
}

export default MyApp;
