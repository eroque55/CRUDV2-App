import IBookToCart from './IBookToCart';
import ICardToSale from './ICardToSale';
import ICustomer from './ICustomer';

interface ICart {
  id: number;
  customer: ICustomer;
  status: boolean;
  sale: ICardToSale;
  bookToCart: IBookToCart[];
  value?: number;
}

export default ICart;
