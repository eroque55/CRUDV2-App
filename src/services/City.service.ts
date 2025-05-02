import ICity from '@/src/interfaces/ICity';
import api from './api';

const citiesUrl = 'cities/';

export const createCity = async (city: ICity) => {
  const response = await api.post<ICity>(citiesUrl, city);
  return response.data;
};

export const getCities = async () => {
  const response = await api.get<ICity[]>(citiesUrl);
  return response.data;
};

export const getCity = async (id: number) => {
  const response = await api.get<ICity>(`${citiesUrl}${id}`);
  return response.data;
};

export const updateCity = async (id: number, city: ICity) => {
  return api.put<ICity>(`${citiesUrl}${id}`, city);
};

export const deleteCity = async (id: number) => {
  return api.delete(`${citiesUrl}${id}`);
};
