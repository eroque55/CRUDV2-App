import { create } from "zustand";
import {
   getAddresses,
   getAddressesByCustomer,
} from "../services/AddressService";
import IAddress from "../@types/IAddress";

interface AddressStore {
   addresses: IAddress[];
   getAddresses: () => Promise<void>;
   getAddressesByCustomer: (customerId: number) => Promise<void>;
}

export const useAddressesStore = create<AddressStore>((set) => ({
   addresses: [],
   getAddresses: async () => {
      try {
         const data = await getAddresses();
         set({ addresses: data });
      } catch (error) {
         console.error("Erro ao buscar os endereços: ", error);
      }
   },
   getAddressesByCustomer: async (customerId: number) => {
      try {
         const data = await getAddressesByCustomer(customerId);
         set({ addresses: data });
      } catch (error) {
         console.error("Erro ao buscar os endereços por cliente: ", error);
      }
   },
}));
