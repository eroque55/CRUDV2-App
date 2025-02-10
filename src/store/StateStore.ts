import { create } from "zustand";
import { getStatesByContry, getStates } from "../services/StateService";
import IState from "../@types/IState";

interface StateStore {
   states: IState[];
   getStates: () => Promise<void>;
   getStatesByCountry: (countryId: number) => Promise<void>;
}

export const useStateStore = create<StateStore>((set) => ({
   states: [],
   getStates: async () => {
      try {
         const data = await getStates();
         set({ states: data });
      } catch (error) {
         console.error("Erro ao buscar os estados: ", error);
      }
   },
   getStatesByCountry: async (countryId: number) => {
      try {
         const data = await getStatesByContry(countryId);
         set({ states: data });
      } catch (error) {
         console.error("Erro ao buscar os estados por pais: ", error);
      }
   },
}));
