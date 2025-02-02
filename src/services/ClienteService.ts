import axios from "axios";
import Cliente from "@/src/@types/ICliente";

const API_URL = "http://localhost:8000/cliente";

export const getClientes = async (): Promise<Cliente[]> => {
   const response = await axios.get(API_URL);
   return response.data;
};

export const updateClienteStatus = async (cliente: Cliente) => {
   return axios.put(API_URL, cliente);
};
