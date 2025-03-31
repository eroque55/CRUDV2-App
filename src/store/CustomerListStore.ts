import { create } from "zustand";
import { getCustomers } from "../services/Customer.service";
import ICustomer from "@/src/interfaces/ICustomer";

interface CustomersListStore {
   customers: ICustomer[];
   fetchCustomers: (customer?: ICustomer) => Promise<void>;
}

export const useCustomersListStore = create<CustomersListStore>((set) => ({
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
