import { create } from "zustand";
import { getCities, getCitiesByState } from "../services/CityService";
import ICity from "../@types/ICity";

interface CityStore {
   cities: ICity[];
   getCities: () => Promise<void>;
   getCitiesByState: (stateId: number) => Promise<void>;
}

export const useCityStore = create<CityStore>((set) => ({
   cities: [],
   getCities: async () => {
      try {
         const data = await getCities();
         set({ cities: data });
      } catch (error) {
         console.error("Erro ao buscar as cidades: ", error);
      }
   },
   getCitiesByState: async (stateId: number) => {
      try {
         const data = await getCitiesByState(stateId);
         set({ cities: data });
      } catch (error) {
         console.error("Erro ao buscar as cidades por estado: ", error);
      }
   },
}));
