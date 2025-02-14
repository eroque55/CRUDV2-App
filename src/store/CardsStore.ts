import { create } from "zustand";
import { getCards, getCardsByCustomer } from "../services/CardService";
import ICard from "../@types/ICard";

interface CardStore {
   cards: ICard[];
   getCards: () => Promise<void>;
   getCardsByCustomer: (customerId: number) => Promise<void>;
}

export const useCardStore = create<CardStore>((set) => ({
   cards: [],
   getCards: async () => {
      try {
         const data = await getCards();
         set({ cards: data });
      } catch (error) {
         console.error("Erro ao buscar os cartões: ", error);
      }
   },
   getCardsByCustomer: async (customerId: number) => {
      try {
         const data = await getCardsByCustomer(customerId);
         set({ cards: data });
      } catch (error) {
         console.error("Erro ao buscar os cartões por cliente: ", error);
      }
   },
}));
