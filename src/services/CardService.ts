import axios from "axios";
import { Card } from "@/src/@types/api";

const API_URL = "http://localhost:8000/cards";

export const createCard = async (card: Card) => {
   const response = await axios.post(API_URL, card);
   return response.data;
};

export const getCards = async (): Promise<Card[]> => {
   const response = await axios.get(API_URL);
   return response.data;
};

export const getCardsByCustomer = async (id: number): Promise<Card[]> => {
   const response = await axios.get(`${API_URL}/customer/${id}`);
   return response.data;
};

export const updateCard = async (id: number, card: Card) => {
   return axios.put(`${API_URL}/${id}`, card);
};

export const deleteCard = async (id: number) => {
   return axios.delete(`${API_URL}/${id}`);
};
