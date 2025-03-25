import { create } from "zustand";
import { getCustomers } from "../services/Customer.service";
import ICustomer from "@/src/interfaces/ICustomer";

interface CustomerStore {
   customers: ICustomer[];
   fetchCustomers: (customer?: ICustomer) => Promise<void>;
}

export const useCustomerStore = create<CustomerStore>((set) => ({
   customers: [],
   fetchCustomers: async (customer?: ICustomer) => {
      try {
         const data = await getCustomers(customer);
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
   modalReset: () => void;
}

export const useCreateModalStore = create<CreateModalState>((set) => ({
   createIsOpen: false,
   modalNumber: 0,
   createOpenModal: () => set({ createIsOpen: true }),
   createCloseModal: () => set({ createIsOpen: false, modalNumber: 0 }),
   modalNext: () => set((state) => ({ modalNumber: state.modalNumber + 1 })),
   modalBack: () => set((state) => ({ modalNumber: state.modalNumber - 1 })),
   modalReset: () => set({ modalNumber: 0 }),
}));

interface FilterModalState {
   filterIsOpen: boolean;
   filterOpenModal: () => void;
   filterCloseModal: () => void;
}

export const useFilterModalStore = create<FilterModalState>((set) => ({
   filterIsOpen: false,
   filterOpenModal: () => set({ filterIsOpen: true }),
   filterCloseModal: () => set({ filterIsOpen: false }),
}));
