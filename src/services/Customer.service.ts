import api from "./api";
import ICustomer from "@/src/interfaces/ICustomer";

const customersUrl = "customers/";

export const createCustomer = async (customer: ICustomer) => {
   const response = await api.post(customersUrl, customer);
   return response.data;
};

export const getCustomer = async (
   id: number,
   customer?: ICustomer
): Promise<ICustomer> => {
   const response = await api.get(`${customersUrl}/${id}`, {
      params: customer,
   });
   return response.data;
};

export const getCustomers = async (
   customer?: ICustomer
): Promise<ICustomer[]> => {
   const response = await api.get(customersUrl, { params: customer });
   return response.data;
};

export const updateCustomer = async (
   id: number,
   customer: Partial<ICustomer>
) => {
   return api.put(`${customersUrl}/${id}`, customer);
};

export const deleteCustomer = async (id: number) => {
   return api.delete(`${customersUrl}/${id}`);
};
