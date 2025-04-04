import { create } from 'zustand';

interface UIState {
	isNavbarExpanded: boolean;
	setNavbarExpanded: (expanded: boolean) => void;
}

export const useUIStore = create<UIState>()((set) => ({
	isNavbarExpanded: false,
	setNavbarExpanded: (expanded) => set({ isNavbarExpanded: expanded }),
}));
