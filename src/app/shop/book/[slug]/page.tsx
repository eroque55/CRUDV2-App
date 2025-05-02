'use client';

import { useParams } from 'next/navigation';
import { getBook } from '@/src/services/Book.service';
import Loader from '@/src/components/Loader';
import Image from 'next/image';
import { getBookValue } from '@/src/utils';
import ButtonComponent from '@/src/components/Button';
import ICart from '@/src/interfaces/ICart';
import ICustomer from '@/src/interfaces/ICustomer';
import useAuthStore from '@/src/store/CustomerShopStore';
import IBookToCart from '@/src/interfaces/IBookToCart';
import { insertBook } from '@/src/services/Cart.service';
import { errorModal, successModal } from '@/src/utils/Toasts';
import Header from '@/src/components/Header';
import {
  BookImageWrapper,
  MainContainer,
  BodyContainer,
  BookInfoContainer,
  BookInfoHeader,
  BookInfoContentContainer,
  Publisher,
  Id,
  BookTitle,
  CategoryContainer,
  Category,
  BookTitleContainer,
  Author,
  Edition,
  ValueContainer,
  Value,
  Stock,
  DescriptionContainer,
  Synopsis,
  DetailsTable,
  TableColumn,
  TableCell,
} from './styles';

const BookPage = () => {
  const { customer } = useAuthStore();
  const params = useParams();
  const { data: book, isLoading } = getBook(String(params.slug));

  if (isLoading) {
    return <Loader />;
  }

  if (!book) {
    return <div>Livro não encontrado</div>;
  }

  const handleAddToCart = async () => {
    try {
      const bookToCart: Partial<IBookToCart> = {
        book,
      };
      const cart: Partial<ICart> = {
        customer: customer as ICustomer,
        bookToCart: [bookToCart as IBookToCart],
      };
      await insertBook(cart as ICart);
      successModal('Livro adicionado ao carrinho com sucesso');
    } catch (error: any) {
      errorModal(error.response.data);
    }
  };

  return (
    <>
      <Header />
      <BodyContainer>
        <MainContainer>
          <BookImageWrapper>
            <Image
              src={`/books/${book.slug}.jpg`}
              alt={`Imagem do livro ${book.title}`}
              width={300}
              height={450}
              style={{
                objectFit: 'contain',
              }}
            />
          </BookImageWrapper>
          <BookInfoContainer>
            <BookInfoContentContainer>
              <BookInfoHeader>
                <Publisher>{book.publisher}</Publisher>
                <Id>id: {book.id}</Id>
              </BookInfoHeader>
              <BookTitleContainer>
                <BookTitle>{book.title}</BookTitle>
                <CategoryContainer>
                  {book.bookToCategory.map(({ category }) => (
                    <Category key={category.id}>{category.name}</Category>
                  ))}
                </CategoryContainer>
                <Author>{book.author}</Author>
                <Edition>
                  {book.edition}ª Ediçao - {book.year}
                </Edition>
              </BookTitleContainer>
              <ValueContainer>
                <Value>R$ {getBookValue(book)}</Value>
                <Stock>
                  Estoque: <strong>{book.stock.amount}</strong>
                </Stock>
              </ValueContainer>
            </BookInfoContentContainer>
            <ButtonComponent onClick={handleAddToCart} icon="CartWhiteIcon">
              Adicionar ao carrinho
            </ButtonComponent>
          </BookInfoContainer>
        </MainContainer>
        <DescriptionContainer>
          <Synopsis dangerouslySetInnerHTML={{ __html: book.synopsis }} />
          <DetailsTable>
            <TableColumn>
              <TableCell>ISBN:</TableCell>
              <TableCell>Código de barras:</TableCell>
              <TableCell>Número de páginas:</TableCell>
              <TableCell>Peso (kg):</TableCell>
              <TableCell>Altura (cm):</TableCell>
              <TableCell>Largura (cm):</TableCell>
              <TableCell>Espessura (cm):</TableCell>
            </TableColumn>
            <TableColumn>
              <TableCell>{book.isbn}</TableCell>
              <TableCell>{book.barcode}</TableCell>
              <TableCell>{book.numberPages}</TableCell>
              <TableCell>{book.bookDimension.weight}</TableCell>
              <TableCell>{book.bookDimension.height}</TableCell>
              <TableCell>{book.bookDimension.width}</TableCell>
              <TableCell>{book.bookDimension.thickness}</TableCell>
            </TableColumn>
          </DetailsTable>
        </DescriptionContainer>
      </BodyContainer>
    </>
  );
};

export default BookPage;
