import IBook from "./IBook";
import ICart from "./ICart";

interface IBookToCart {
   cart: ICart;
   book: IBook;
   ammount: number;
   updatedAt: Date;
   status: boolean;
}

export default IBookToCart;
