import { create } from "zustand";
import { getPhones, getPhoneByCustomer } from "../services/PhoneService";
import IPhone from "../@types/IPhone";

interface PhoneStore {
   phone: IPhone;
   getPhoneByCustomer: (customerId: number) => Promise<void>;
}

export const usePhoneStore = create<PhoneStore>((set) => ({
   phone: {} as IPhone,
   getPhoneByCustomer: async (customerId: number) => {
      try {
         const data = await getPhoneByCustomer(customerId);
         set({ phone: data });
      } catch (error) {
         console.error("Erro ao buscar o telefone: ", error);
      }
   },
}));
