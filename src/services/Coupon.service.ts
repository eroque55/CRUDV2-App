import api from './api';
import ICoupon from '../interfaces/ICoupon';

const couponsUrl = 'coupons/';

export const getCoupon = async (name: string) => {
  const response = await api.get<ICoupon>(`${couponsUrl}${name}`);
  return response.data;
};
