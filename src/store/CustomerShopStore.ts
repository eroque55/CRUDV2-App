import { create } from "zustand";
import ICustomer from "../interfaces/ICustomer";

interface UseAuthStore {
   customer: ICustomer | null;
   login: (customer: ICustomer) => Promise<void>;
   logout: () => void;
   loadUser: () => void;
}

const useAuthStore = create<UseAuthStore>((set, get) => ({
   customer: null,

   login: async (customer: ICustomer) => {
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
