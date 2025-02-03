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

interface ExitModalState {
   ExitIsOpen: boolean;
   exitOpenModal: () => void;
   exitCloseModal: () => void;
}

export const useSairModalStore = create<ExitModalState>((set) => ({
   ExitIsOpen: false,
   exitOpenModal: () => set({ ExitIsOpen: true }),
   exitCloseModal: () => set({ ExitIsOpen: false }),
}));
