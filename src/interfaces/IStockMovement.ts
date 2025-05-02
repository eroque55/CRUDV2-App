import IStock from './IStock';

interface IStockMovement {
  id: number;
  amount: number;
  movementType: 'ENTRADA' | 'SAIDA' | 'REENTRADA';
  cost: number;
  supplier: string;
  createdAt: Date;

  stock: IStock;
}

export default IStockMovement;
