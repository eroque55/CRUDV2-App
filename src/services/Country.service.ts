import ICountry from '@/src/interfaces/ICountry';
import api from './api';

const countriesUrl = 'countries/';

export const createCountry = async (country: ICountry) => {
  const response = await api.post<ICountry>(countriesUrl, country);
  return response.data;
};

export const getCountries = async () => {
  const response = await api.get<ICountry[]>(countriesUrl);
  return response.data;
};

export const getCountry = async (id: number) => {
  const response = await api.get<ICountry>(`${countriesUrl}${id}`);
  return response.data;
};

export const updateCountry = async (id: number, country: ICountry) => {
  return api.put<ICountry>(`${countriesUrl}${id}`, country);
};

export const deleteCountry = async (id: number) => {
  return api.delete(`${countriesUrl}${id}`);
};
