'use client';

import Product from '@/src/components/Product';
import useCategoryFilter from '@/src/hooks/useCategoryFilter';
import { getBooks } from '@/src/services/Book.service';
import Loader from '@/src/components/Loader';
import Header from '@/src/components/Header';
import useBookFilter from '@/src/hooks/useBookFilter';
import { MainContainer, BodyContainer } from './styles';

const Shop = () => {
  const { slug } = useCategoryFilter();
  const { title } = useBookFilter();
  const { data: books, isLoading } = getBooks(slug, title);

  return (
    <BodyContainer>
      <Header />
      <MainContainer>
        {isLoading && <Loader />}
        {books?.map(book => <Product book={book} key={book.id} />)}
      </MainContainer>
    </BodyContainer>
  );
};

export default Shop;
