import IBook from './IBook';

interface IPriceGroup {
  id: number;
  name: string;
  tax: number;

  books: IBook[];
}

export default IPriceGroup;
