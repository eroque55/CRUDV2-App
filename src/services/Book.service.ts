import { useQuery } from "@tanstack/react-query";
import api from "./api";
import IBook from "@/src/interfaces/IBook";

const booksUrl = "books/";

export const getBooks = (filter?: Partial<IBook>) => {
   const getBooks = async (book?: IBook) => {
      const { data } = await api.get<IBook[]>(booksUrl, {
         params: book,
      });

      if (data) {
         return data;
      }
   };

   return useQuery({
      queryKey: ["books", filter],
      queryFn: () => getBooks(filter as IBook),
   });
};

export const getBook = async (id: number) => {
   const response = await api.get<IBook>(`${booksUrl}${id}`);
   return response.data;
};
