import { create } from "zustand";
import ICustomer from "@/src/interfaces/ICustomer";
import { getCustomer } from "../services/Customer.service";
import { errorModal } from "../utils/Toasts";

interface CustomerDetailsState {
   customer: ICustomer | null;
   loading: boolean;
   fetchCustomer: (id?: number) => Promise<void>;
}

export const useCustomerDetailsStore = create<CustomerDetailsState>((set) => ({
   customer: null,
   loading: true,
   fetchCustomer: async (id?: number) => {
      if (!id) {
         set({ customer: null, loading: true });
      } else {
         try {
            const data = await getCustomer(id);
            set({ customer: data, loading: false });
         } catch (error: any) {
            errorModal(error.response.data);
         }
      }
   },
}));
