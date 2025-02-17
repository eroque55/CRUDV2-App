import axios from "axios";
import { Phone } from "@/src/@types/api";

const API_URL = "http://localhost:8000/phones";

export const createPhone = async (phone: Phone) => {
   const response = await axios.post(API_URL, phone);
   return response.data;
};

export const getPhones = async (): Promise<Phone[]> => {
   const response = await axios.get(API_URL);
   return response.data;
};

export const updatePhone = async (id: number, phone: Phone) => {
   return axios.put(`${API_URL}/${id}`, phone);
};

export const deletePhone = async (id: number) => {
   return axios.delete(`${API_URL}/${id}`);
};
