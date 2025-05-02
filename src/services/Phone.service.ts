import IPhone from '@/src/interfaces/IPhone';
import api from './api';

const phonesUrl = 'phones/';

export const createPhone = async (phone: IPhone) => {
  const response = await api.post<IPhone>(phonesUrl, phone);
  return response.data;
};

export const getPhones = async () => {
  const response = await api.get<IPhone[]>(phonesUrl);
  return response.data;
};

export const updatePhone = async (id: number, phone: Partial<IPhone>) => {
  return api.put<IPhone>(`${phonesUrl}${id}`, phone);
};

export const deletePhone = async (id: number) => {
  return api.delete(`${phonesUrl}${id}`);
};
