import { create } from "zustand";
import { getCustomers } from "../services/CustomerService";
import { Customer } from "@/src/@types/api";

interface CustomerStore {
   customers: Customer[];
   fetchCustomers: () => Promise<void>;
}

export const useCustomerStore = create<CustomerStore>((set) => ({
   customers: [],
   fetchCustomers: async () => {
      try {
         const data = await getCustomers();
         set({ customers: data });
      } catch (error) {
         console.error("Erro ao buscar os clientes: ", error);
      }
   },
}));

interface CreateModalState {
   createIsOpen: boolean;
   createOpenModal: () => void;
   createCloseModal: () => void;
   modalNumber: number;
   modalNext: () => void;
   modalBack: () => void;
}

export const useCreateModalStore = create<CreateModalState>((set) => ({
   createIsOpen: false,
   createOpenModal: () => set({ createIsOpen: true }),
   createCloseModal: () => set({ createIsOpen: false, modalNumber: 0 }),
   modalNumber: 1,
   modalNext: () => set((state) => ({ modalNumber: state.modalNumber + 1 })),
   modalBack: () => set((state) => ({ modalNumber: state.modalNumber - 1 })),
}));
