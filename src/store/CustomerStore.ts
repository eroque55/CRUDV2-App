import { create } from "zustand";
import { getCustomer } from "../services/CustomerService";
import { Customer } from "@/src/@types/api";

interface CustomerStore {
   customer: Customer;
   getCustomer: (id: number) => Promise<void>;
}

export const useCustomerStore = create<CustomerStore>((set) => ({
   customer: {} as Customer,
   getCustomer: async (id) => {
      try {
         const data = await getCustomer(id);
         set({ customer: data });
      } catch (error) {
         console.error("Erro ao buscar o cliente: ", error);
      }
   },
}));
