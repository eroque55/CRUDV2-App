import ICard from '@/src/interfaces/ICard';
import api from './api';

const cardsUrl = 'cards/';

export const createCard = async (card: ICard) => {
  const response = await api.post<ICard>(cardsUrl, card);
  return response.data;
};

export const getCards = async () => {
  const response = await api.get<ICard[]>(cardsUrl);
  return response.data;
};

export const updateCard = async (id: number) => {
  return api.put<ICard>(`${cardsUrl}${id}`);
};

export const deleteCard = async (id: number) => {
  return api.delete(`${cardsUrl}${id}`);
};
