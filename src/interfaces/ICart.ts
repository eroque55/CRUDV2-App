import IBookToCart from "./IBookToCart";
import ICardToSale from "./ICardToSale";
import ICustomer from "./ICustomer";

interface ICart {
   id: number;
   customer: ICustomer;
   sale: ICardToSale;
   bookToCart: IBookToCart[];
}

export default ICart;
