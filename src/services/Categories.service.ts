import ICategory from "../interfaces/ICategory";
import api from "./api";

const categoriesUrl = "categories/";

export const getCategories = async () => {
   const response = await api.get<ICategory[]>(categoriesUrl);
   return response.data;
};

export const getCategory = async (id: number) => {
   const response = await api.get<ICategory>(`${categoriesUrl}${id}`);
   return response.data;
};
