import { create } from "zustand";
import { getCustomer } from "../services/CustomerService";
import ICustomer from "../@types/ICustomer";

interface CustomerStore {
   customer: ICustomer;
   getCustomer: (id: number) => Promise<void>;
}

export const useCustomerStore = create<CustomerStore>((set) => ({
   customer: {} as ICustomer,
   getCustomer: async (id) => {
      try {
         const data = await getCustomer(id);
         set({ customer: data });
      } catch (error) {
         console.error("Erro ao buscar o cliente: ", error);
      }
   },
}));
