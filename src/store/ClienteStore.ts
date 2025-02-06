import { create } from "zustand";
import { getClientes } from "../services/ClienteService";
import Cliente from "../@types/ICliente";

interface ClienteStore {
   clientes: Cliente[];
   carregarClientes: () => Promise<void>;
}

export const useClienteStore = create<ClienteStore>((set) => ({
   clientes: [],
   carregarClientes: async () => {
      try {
         const data = await getClientes();
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
}

export const useCreateModalStore = create<CreateModalState>((set) => ({
   createIsOpen: false,
   createOpenModal: () => set({ createIsOpen: true }),
   createCloseModal: () => set({ createIsOpen: false }),
}));
