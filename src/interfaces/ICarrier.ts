import IFreight from './IFreight';

interface ICarrier {
  id: number;
  name: string;
  cost: number;
  freights: IFreight[];
}

export default ICarrier;
