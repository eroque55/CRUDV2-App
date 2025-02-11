import { create } from "zustand";
import IAddress from "../@types/IAddress";
import ICard from "../@types/ICard";

interface DeleteState {
   isOpen: boolean;
   itemId: number | null;
   openModal: (id: number) => void;
   closeModal: () => void;
}

export const useDeleteModal = create<DeleteState>((set) => ({
   isOpen: false,
   itemId: null,
   openModal: (id: number) => set({ isOpen: true, itemId: id }),
   closeModal: () => set({ isOpen: false, itemId: null }),
}));

interface UpdateState<T> {
   isOpen: boolean;
   item: T | null;
   openModal: (item: T) => void;
   closeModal: () => void;
}

export const useUpdateAddress = create<UpdateState<IAddress>>((set) => ({
   isOpen: false,
   item: null,
   openModal: (address) => set({ isOpen: true, item: address }),
   closeModal: () => set({ isOpen: false, item: null }),
}));

export const useUpdateCard = create<UpdateState<ICard>>((set) => ({
   isOpen: false,
   item: null,
   openModal: (card) => set({ isOpen: true, item: card }),
   closeModal: () => set({ isOpen: false, item: null }),
}));

interface CreateState {
   isOpen: boolean;
   customerId: number;
   openModal: (customerId: number) => void;
   closeModal: () => void;
}

export const useCreateAddress = create<CreateState>((set) => ({
   isOpen: false,
   customerId: 0,
   openModal: (customerId: number) => set({ isOpen: true, customerId }),
   closeModal: () => set({ isOpen: false }),
}));

export const useCreateCard = create<CreateState>((set) => ({
   isOpen: false,
   customerId: 0,
   openModal: (customerId: number) => set({ isOpen: true, customerId }),
   closeModal: () => set({ isOpen: false }),
}));
