import { create } from "zustand";
import { Customer } from "../@types/api";

interface UseAuthStore {
   customer: Customer | null;
   login: (customer: Customer) => Promise<void>;
   logout: () => void;
   loadUser: () => void;
}

const useAuthStore = create<UseAuthStore>((set) => ({
   customer: null,

   login: async (customer: Customer) => {
      localStorage.setItem("customer", JSON.stringify(customer));
      set({ customer: customer });
   },

   logout: () => {
      localStorage.removeItem("customer");
      set({ customer: null });
   },

   loadUser: () => {
      const storedCustomer = localStorage.getItem("customer");
      if (storedCustomer) {
         set({ customer: JSON.parse(storedCustomer) });
      }
   },
}));

export default useAuthStore;
