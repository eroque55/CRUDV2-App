import axios from "axios";
import { Address } from "@/src/@types/api";

const API_URL = "http://localhost:8000/addresses";

export const createAddress = async (address: Address) => {
   const response = await axios.post(API_URL, address);
   return response.data;
};

export const getAddresses = async (): Promise<Address[]> => {
   const response = await axios.get(API_URL);
   return response.data;
};

export const getAddressesByCustomer = async (
   id: number
): Promise<Address[]> => {
   const response = await axios.get(`${API_URL}/customer/${id}`);
   return response.data;
};

export const updateAddress = async (id: number, address: Address) => {
   return axios.put(`${API_URL}/${id}`, address);
};

export const deleteAddress = async (id: number) => {
   return axios.delete(`${API_URL}/${id}`);
};
