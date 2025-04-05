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

export const getBook = (slug: string) => {
   const getBook = async (slug: string) => {
      const { data } = await api.get<IBook>(`${booksUrl}/${slug}`);

      if (data) {
         return data;
      }
   };

   return useQuery({
      queryKey: ["book", slug],
      queryFn: () => getBook(slug),
   });
};
