import axios from "axios";
import { Country } from "@/src/@types/api";

const API_URL = "http://localhost:8000/countries";

export const createCountry = async (country: Country) => {
   const response = await axios.post(API_URL, country);
   return response.data;
};

export const getCountries = async (): Promise<Country[]> => {
   const response = await axios.get(API_URL);
   return response.data;
};

export const getCountry = async (id: number): Promise<Country> => {
   const response = await axios.get(`${API_URL}/${id}`);
   return response.data;
};

export const updateCountry = async (id: number, country: Country) => {
   return axios.put(`${API_URL}/${id}`, country);
};

export const deleteCountry = async (id: number) => {
   return axios.delete(`${API_URL}/${id}`);
};
