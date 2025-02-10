import axios from "axios";
import ICountry from "@/src/@types/ICountry";

const API_URL = "http://localhost:8000/countries";

export const createCountry = async (country: ICountry) => {
   const response = await axios.post(API_URL, country);
   return response.data;
};

export const getCountries = async (): Promise<ICountry[]> => {
   const response = await axios.get(API_URL);
   return response.data;
};

export const getCountry = async (id: number): Promise<ICountry> => {
   const response = await axios.get(`${API_URL}/${id}`);
   return response.data;
};

export const updateCountry = async (id: number, country: ICountry) => {
   return axios.put(`${API_URL}/${id}`, country);
};

export const deleteCountry = async (id: number) => {
   return axios.delete(`${API_URL}/${id}`);
};
