import axios from "axios";
import { City } from "@/src/@types/api";

const API_URL = "http://localhost:8000/cities";

export const createCity = async (city: City) => {
   const response = await axios.post(API_URL, city);
   return response.data;
};

export const getCities = async (): Promise<City[]> => {
   const response = await axios.get(API_URL);
   return response.data;
};

export const getCity = async (id: number): Promise<City> => {
   const response = await axios.get(`${API_URL}/${id}`);
   return response.data;
};

export const getCitiesByState = async (id: number): Promise<City[]> => {
   const response = await axios.get(`${API_URL}/state/${id}`);
   return response.data;
};

export const updateCity = async (id: number, city: City) => {
   return axios.put(`${API_URL}/${id}`, city);
};

export const deleteCity = async (id: number) => {
   return axios.delete(`${API_URL}/${id}`);
};
