import { create } from "zustand";
import { getCustomers } from "../services/CustomerService";
import ICustomer from "../@types/ICustomer";

interface ClienteStore {
   clientes: ICustomer[];
   carregarClientes: () => Promise<void>;
}

export const useClienteStore = create<ClienteStore>((set) => ({
   clientes: [],
   carregarClientes: async () => {
      try {
         const data = await getCustomers();
         set({ clientes: data });
      } catch (error) {
         console.error("Erro ao buscar os clientes: ", error);
      }
   },
}));

interface DeleteModalState {
   deleteIsOpen: boolean;
   selecedItemId: number | null;
   deleteOpenModal: (id: number) => void;
   deleteCloseModal: () => void;
}

export const useDeleteModalStore = create<DeleteModalState>((set) => ({
   deleteIsOpen: false,
   selecedItemId: null,
   deleteOpenModal: (id: number) =>
      set({ deleteIsOpen: true, selecedItemId: id }),
   deleteCloseModal: () => set({ deleteIsOpen: false, selecedItemId: null }),
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
   createCloseModal: () => set({ createIsOpen: false }),
   modalNumber: 1,
   modalNext: () => set((state) => ({ modalNumber: state.modalNumber + 1 })),
   modalBack: () => set((state) => ({ modalNumber: state.modalNumber - 1 })),
}));
