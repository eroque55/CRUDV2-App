import axios from "axios";
import ICustomer from "@/src/@types/ICustomer";

const API_URL = "http://localhost:8000/customers";

export const createCustomer = async (customer: ICustomer) => {
   const response = await axios.post(API_URL, customer);
   return response.data;
};

export const getCustomer = async (id: number): Promise<ICustomer> => {
   const response = await axios.get(`${API_URL}/${id}`);
   return response.data;
};

export const getCustomers = async (): Promise<ICustomer[]> => {
   const response = await axios.get(API_URL);
   return response.data;
};

export const updateCustomerStatus = async (id: number, customer: ICustomer) => {
   return axios.put(`${API_URL}/${id}`, customer);
};

export const deleteCustomer = async (id: number) => {
   return axios.delete(`${API_URL}/${id}`);
};
