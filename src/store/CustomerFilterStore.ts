import { create } from "zustand";
import ICustomer from "@/src/interfaces/ICustomer";

interface CustomerFilterStore {
   filter: Partial<ICustomer>;
   setFilter: (filter: Partial<ICustomer>) => void;
}

export const useCustomerFilterStore = create<CustomerFilterStore>((set) => ({
   filter: {},
   setFilter: (filter) => set({ filter }),
}));
