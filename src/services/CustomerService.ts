import axios from "axios";
import { Customer } from "@/src/@types/api";

const API_URL = "http://localhost:8000/customers";

export const createCustomer = async (customer: Customer) => {
   const response = await axios.post(API_URL, customer);
   return response.data;
};

export const getCustomer = async (id: number): Promise<Customer> => {
   const response = await axios.get(`${API_URL}/${id}`);
   return response.data;
};

export const getCustomers = async (
   customer?: Customer
): Promise<Customer[]> => {
   const response = await axios.get(API_URL, { params: customer });
   return response.data;
};

export const updateCustomer = async (
   id: number,
   customer: Partial<Customer>
) => {
   return axios.put(`${API_URL}/${id}`, customer);
};

export const deleteCustomer = async (id: number) => {
   return axios.delete(`${API_URL}/${id}`);
};
