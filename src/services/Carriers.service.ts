import api from "./api";
import ICarrier from "@/src/interfaces/ICarrier";

const carriersUrl = "carriers/";

export const getCarriers = async () => {
   const response = await api.get<ICarrier[]>(carriersUrl);

   return response.data;
};
