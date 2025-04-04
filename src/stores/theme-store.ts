import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ThemeState {
	isDark: boolean;
	toggleTheme: () => void;
	setTheme: (theme: 'light' | 'dark') => void;
}

export const useThemeStore = create<ThemeState>()(
	persist(
		(set) => ({
			isDark: false,
			toggleTheme: () => set((state) => ({ isDark: !state.isDark })),
			setTheme: (theme) => set({ isDark: theme === 'dark' }),
		}),
		{
			name: 'theme-storage',
		}
	)
);
