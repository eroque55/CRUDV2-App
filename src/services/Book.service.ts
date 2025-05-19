import { useQuery } from '@tanstack/react-query';
import IBook from '@/src/interfaces/IBook';
import api from './api';

const booksUrl = 'books/';

export const getBooks = (slug?: string, title?: string) => {
  const getBooks = async (slug?: string, title?: string) => {
    const { data } = await api.get<IBook[]>(booksUrl, {
      params: {
        slug,
        title,
      },
    });

    if (data) {
      return data;
    }
  };

  return useQuery({
    queryKey: ['books', slug, title],
    queryFn: () => getBooks(slug, title),
  });
};

export const getBook = (slug: string) => {
  const getBook = async (slug: string) => {
    const { data } = await api.get<IBook>(`${booksUrl}${slug}`);

    if (data) {
      return data;
    }
  };

  return useQuery({
    queryKey: ['book', slug],
    queryFn: () => getBook(slug),
  });
};
