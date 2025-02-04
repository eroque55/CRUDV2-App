import axios from "axios";
import Cliente from "@/src/@types/ICliente";

const API_URL = "http://localhost:8000/clientes";

export const getClientes = async (): Promise<Cliente[]> => {
   const response = await axios.get(API_URL);
   return response.data;
};

export const updateClienteStatus = async (id: number, cliente: Cliente) => {
   return axios.put(`${API_URL}/${id}`, cliente);
};

export const deleteCliente = async (id: number) => {
   return axios.delete(`${API_URL}/${id}`);
};
