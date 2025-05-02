import IBook from './IBook';

interface IBookDimension {
  id: number;
  book: IBook;
  height: number;
  width: number;
  weight: number;
  thickness: number;
}

export default IBookDimension;
