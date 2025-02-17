import { create } from "zustand";
import { Card, Address } from "@/src/@types/api";
import { Customer } from "@/src/@types/api";
import { getCustomer } from "../services/CustomerService";

interface CustomerState {
   customer: Customer | null;
   getCustomer: (id: number) => Promise<void>;
}

export const useCustomerState = create<CustomerState>((set) => ({
   customer: null,
   getCustomer: async (id: number) => {
      try {
         const data = await getCustomer(id);
         set({ customer: data });
      } catch (error) {
         console.error("Erro ao buscar o cliente: ", error);
      }
   },
}));

interface UpdateState<T> {
   isOpen: boolean;
   item: T | null;
   openModal: (item: T) => void;
   closeModal: () => void;
}

export const useUpdateAddress = create<UpdateState<Address>>((set) => ({
   isOpen: false,
   item: null,
   openModal: (address) => set({ isOpen: true, item: address }),
   closeModal: () => set({ isOpen: false, item: null }),
}));

export const useUpdateCard = create<UpdateState<Card>>((set) => ({
   isOpen: false,
   item: null,
   openModal: (card) => set({ isOpen: true, item: card }),
   closeModal: () => set({ isOpen: false, item: null }),
}));

interface UpdateCustomer {
   isOpen: boolean;
   openModal: () => void;
   closeModal: () => void;
}

export const useUpdateCustomer = create<UpdateCustomer>((set) => ({
   isOpen: false,
   openModal: () => set({ isOpen: true }),
   closeModal: () => set({ isOpen: false }),
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
