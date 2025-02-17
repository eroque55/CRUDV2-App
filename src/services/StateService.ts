import axios from "axios";
import { State } from "@/src/@types/api";

const API_URL = "http://localhost:8000/states";

export const createState = async (state: State) => {
   const response = await axios.post(API_URL, state);
   return response.data;
};

export const getStates = async (): Promise<State[]> => {
   const response = await axios.get(API_URL);
   return response.data;
};

export const getState = async (id: number): Promise<State> => {
   const response = await axios.get(`${API_URL}/${id}`);
   return response.data;
};

export const updateState = async (id: number, state: State) => {
   return axios.put(`${API_URL}/${id}`, state);
};

export const deleteState = async (id: number) => {
   return axios.delete(`${API_URL}/${id}`);
};
