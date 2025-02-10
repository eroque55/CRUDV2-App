import axios from "axios";
import IState from "@/src/@types/IState";

const API_URL = "http://localhost:8000/states";

export const createState = async (state: IState) => {
   const response = await axios.post(API_URL, state);
   return response.data;
};

export const getStates = async (): Promise<IState[]> => {
   const response = await axios.get(API_URL);
   return response.data;
};

export const getState = async (id: number): Promise<IState> => {
   const response = await axios.get(`${API_URL}/${id}`);
   return response.data;
};

export const getStatesByContry = async (id: number): Promise<IState[]> => {
   const response = await axios.get(`${API_URL}/country/${id}`);
   return response.data;
};

export const updateState = async (id: number, state: IState) => {
   return axios.put(`${API_URL}/${id}`, state);
};

export const deleteState = async (id: number) => {
   return axios.delete(`${API_URL}/${id}`);
};
