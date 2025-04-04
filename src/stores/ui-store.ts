import { create } from 'zustand';

interface UIState {
	isNavbarExpanded: boolean;
	setNavbarExpanded: (expanded: boolean) => void;
	isBentoLayout: boolean;
	setBentoLayout: (isBento: boolean) => void;
}

export const useUIStore = create<UIState>()((set) => ({
	isNavbarExpanded: false,
	setNavbarExpanded: (expanded) => set({ isNavbarExpanded: expanded }),
	isBentoLayout: false,
	setBentoLayout: (isBento) => set({ isBentoLayout: isBento }),
}));
