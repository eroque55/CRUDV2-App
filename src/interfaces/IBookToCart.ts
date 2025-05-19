import IBook from './IBook';
import ICart from './ICart';

interface IBookToCart {
  cart: ICart;
  book: IBook;
  amount: number;
  updatedAt: Date;
  status: boolean;
  subtotal?: number;
}

export default IBookToCart;
