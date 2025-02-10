import { create } from "zustand";
import { getCountries } from "../services/ContryService";
import ICountry from "../@types/ICountry";

interface CountryStore {
   countries: ICountry[];
   getCountries: () => Promise<void>;
}

export const useCountryStore = create<CountryStore>((set) => ({
   countries: [],
   getCountries: async () => {
      try {
         const data = await getCountries();
         set({ countries: data });
      } catch (error) {
         console.error("Erro ao buscar os paises: ", error);
      }
   },
}));
