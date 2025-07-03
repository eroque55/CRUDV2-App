import ISale from '@/src/interfaces/ISale';
import api from './api';
import ICoupon from '../interfaces/ICoupon';

const salesUrl = 'sales/';

export const createSale = async (sale: ISale) => {
  const response = await api.post<ISale>(salesUrl, sale);
  return response.data;
};

export const getSaleByCustomer = async (customerId: number) => {
  const response = await api.get<ISale[]>(`${salesUrl}customer/${customerId}`);
  return response.data;
};

export const updateStatus = async (saleId: number, status: string) => {
  const response = await api.put<ISale>(`${salesUrl}${saleId}`, {
    status,
  });

  return response.data;
};

export const getSales = async () => {
  const response = await api.get<ISale[]>(salesUrl);
  return response.data;
};

export const getSaleByCategory = async (from?: Date, to?: Date) => {
  const response = await api.get(`${salesUrl}byCategory`, {
    params: {
      from: from ? from.toISOString() : undefined,
      to: to ? to.toISOString() : undefined,
    },
  });
  return response.data;
};

export const acceptTradeGenerateCoupon = async (
  saleId: number,
  couponValue: number,
) => {
  const response = await api.put<ICoupon>(`${salesUrl}acceptTrade/${saleId}`, {
    couponValue,
  });
  return response.data;
};
