import { useQuery } from '@tanstack/react-query';
import ICustomer from '@/src/interfaces/ICustomer';
import api from './api';

const customersUrl = 'customers/';

export const createCustomer = async (customer: ICustomer) => {
  const response = await api.post(customersUrl, customer);
  return response.data;
};

export const getCustomer = (id: number) => {
  const getCustomer = async (id: number) => {
    const { data } = await api.get<ICustomer>(`${customersUrl}${id}`);

    if (data) {
      return data;
    }
  };

  return useQuery({
    queryKey: ['customer', id],
    queryFn: () => getCustomer(id),
  });
};

export const getCustomers = (filter?: Partial<ICustomer>) => {
  const getCustomers = async (customer?: ICustomer) => {
    const { data } = await api.get<ICustomer[]>(customersUrl, {
      params: customer,
    });

    if (data) {
      return data;
    }
  };

  return useQuery({
    queryKey: ['customers', filter],
    queryFn: () => getCustomers(filter as ICustomer),
  });
};

export const updateCustomer = async (
  id: number,
  customer: Partial<ICustomer>,
) => {
  return api.put(`${customersUrl}${id}`, customer);
};

export const deleteCustomer = async (id: number) => {
  return api.delete(`${customersUrl}/${id}`);
};

export const getCustomerToLogin = async (
  customer: Partial<ICustomer>,
): Promise<ICustomer> => {
  const { data } = await api.get<ICustomer>(`${customersUrl}0`, {
    params: customer,
  });

  return data;
};
