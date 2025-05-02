import IBook from './IBook';

interface IReasonCategory {
  id: number;
  description: string;
  isActivation: boolean;

  books: IBook[];
}

export default IReasonCategory;
