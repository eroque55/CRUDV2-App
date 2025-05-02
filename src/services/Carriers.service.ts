import ICarrier from '@/src/interfaces/ICarrier';
import api from './api';

const carriersUrl = 'carriers/';

export const getCarriers = async () => {
  const response = await api.get<ICarrier[]>(carriersUrl);

  return response.data;
};
