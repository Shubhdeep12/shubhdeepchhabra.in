import { create } from 'zustand';

interface UIState {
	isNavbarExpanded: boolean;
	currentFocusedItem: string;
	setNavbarExpanded: (expanded: boolean) => void;
	setCurrentFocusedItem: (item: string) => void;
}

export const useUIStore = create<UIState>()((set) => ({
	isNavbarExpanded: false,
	currentFocusedItem: '',
	setNavbarExpanded: (expanded) => set({ isNavbarExpanded: expanded }),
	setCurrentFocusedItem: (item) => set({ currentFocusedItem: item }),
}));
