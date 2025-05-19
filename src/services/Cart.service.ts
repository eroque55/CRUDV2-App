import { useQuery } from '@tanstack/react-query';
import ICart from '@/src/interfaces/ICart';
import api from './api';
import { errorModal } from '../utils/Toasts';

const cartsUrl = 'carts/';

export const getCart = (customerId: number) => {
  const fetchCart = async (id: number) => {
    const { data } = await api.get<ICart>(`${cartsUrl}${id}`);

    if (data) {
      return data;
    }
  };

  return useQuery({
    queryKey: ['cart', customerId],
    queryFn: () => fetchCart(customerId),
  });
};

export const updateCart = async (cart: ICart) => {
  try {
    const data = await api.put<ICart>(`${cartsUrl}${cart.id}`, cart);

    return data;
  } catch (e) {
    console.error(e);
    errorModal('Erro ao atualizar o carrinho');
  }
};

export const insertBook = async (cart: ICart) => {
  const data = await api.post<ICart>(`${cartsUrl}`, cart);

  return data;
};
