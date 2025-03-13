import { create } from "zustand";

interface NavBarState {
   navBarIsOpen: boolean;
   navBarOpen: () => void;
   navBarClose: () => void;
}

export const useNavBarStore = create<NavBarState>((set) => ({
   navBarIsOpen: false,
   navBarOpen: () => set({ navBarIsOpen: true }),
   navBarClose: () => set({ navBarIsOpen: false }),
}));
