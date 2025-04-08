import api from "./api";
import ISale from "@/src/interfaces/ISale";

const salesUrl = "sales/";

export const createSale = async (sale: ISale) => {
   const response = await api.post<ISale>(salesUrl, sale);
   return response.data;
};
