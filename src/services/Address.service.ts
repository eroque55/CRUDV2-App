import api from "./api";
import IAddress from "@/src/interfaces/IAddress";

const addressesUrl = "addresses/";

export const createAddress = async (address: IAddress) => {
   const response = await api.post<IAddress>(addressesUrl, address);
   return response.data;
};

export const getAddresses = async () => {
   const response = await api.get<IAddress[]>(addressesUrl);
   return response.data;
};

export const updateAddress = async (id: number, address: Partial<IAddress>) => {
   const response = await api.put<IAddress>(`${addressesUrl}${id}`, address);
   return response.data;
};

export const deleteAddress = async (id: number) => {
   return api.delete(`${addressesUrl}${id}`);
};
