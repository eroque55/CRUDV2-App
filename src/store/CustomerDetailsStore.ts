import { create } from "zustand";
import ICard from "@/src/interfaces/ICard";
import IAddress from "@/src/interfaces/IAddress";
import ICustomer from "@/src/interfaces/ICustomer";
import { getCustomer } from "../services/Customer.service";

interface CustomerState {
   customer: ICustomer | null;
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

export const useUpdatePassword = create<CreateState>((set) => ({
   isOpen: false,
   customerId: 0,
   openModal: (customerId: number) => set({ isOpen: true, customerId }),
   closeModal: () => set({ isOpen: false }),
}));
