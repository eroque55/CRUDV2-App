import IStockMovement from './IStockMovement';

interface IStock {
  id: number;
  amount: number;
  updatedAt: Date;
  stockMovement: IStockMovement[];
}

export default IStock;
