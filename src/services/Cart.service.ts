import { useQuery } from "@tanstack/react-query";
import api from "./api";
import ICart from "@/src/interfaces/ICart";
import { errorModal } from "../utils/Toasts";

const cartsUrl = "carts/";

export const getCart = (customerId: number) => {
   const getCart = async (customerId: number) => {
      const { data } = await api.get<ICart>(`${cartsUrl}/${customerId}`);

      if (data) {
         return data;
      }
   };

   return useQuery({
      queryKey: ["cart", customerId],
      queryFn: () => getCart(customerId),
   });
};

export const updateCart = async (cart: ICart) => {
   try {
      const data = await api.put<ICart>(`${cartsUrl}/${cart.id}`, cart);

      return data;
   } catch (e) {
      errorModal("Erro ao atualizar o carrinho");
   }
};

export const insertBook = async (cart: ICart) => {
   const data = await api.post<ICart>(`${cartsUrl}`, cart);

   return data;
};
