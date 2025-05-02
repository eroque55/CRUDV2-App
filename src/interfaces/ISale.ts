import ICardToSale from './ICardToSale';
import ICart from './ICart';
import ICoupon from './ICoupon';
import IFreight from './IFreight';

interface ISale {
  id: number;
  totalValue: number;
  status: boolean;
  createdAt: Date;
  paymentMethod: string;

  coupons: ICoupon[];
  cart: ICart;
  freight: IFreight;
  cardToSales: ICardToSale[];
}

export default ISale;
