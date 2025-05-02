import IBookDimension from './IBookDimension';
import IBookToCategory from './IBookToCategory';
import IPriceGroup from './IPriceGroup';
import IReasonCategory from './IReasonCategory';
import IStock from './IStock';

interface IBook {
  id: number;
  title: string;
  slug: string;
  author: string;
  status: boolean;
  year: number;
  synopsis: string;
  numberPages: number;
  publisher: string;
  edition: number;
  isbn: string;
  barcode: string;
  inativatonReason?: string;
  bookDimension: IBookDimension;
  stock: IStock;
  priceGroup: IPriceGroup;
  bookToCategory: IBookToCategory[];
  reasonCategory?: IReasonCategory;
}

export default IBook;
