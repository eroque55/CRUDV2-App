import ICardToSale from './ICardToSale';
import ICart from './ICart';
import ICoupon from './ICoupon';
import IFreight from './IFreight';

interface ISale {
  id: number;
  totalValue: number;
  status:
    | 'EM_PROCESSAMENTO'
    | 'APROVADA'
    | 'TRANSPORTE_INICIADO'
    | 'REPROVADA'
    | 'ENTREGUE'
    | 'TROCA_SOLICITADA'
    | 'TROCA_APROVADA'
    | 'TROCA_REPROVADA'
    | 'TROCA_FINALIZADA';
  createdAt: Date;
  paymentMethod: string;

  coupons: ICoupon[];
  cart: ICart;
  freight: IFreight;
  cardToSales: ICardToSale[];
}

export default ISale;
