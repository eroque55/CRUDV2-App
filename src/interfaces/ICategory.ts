import IBookToCategory from "./IBookToCategory";

interface ICategory {
   id: number;
   name: string;
   slug: string;
   bookToCategory: IBookToCategory[];
}

export default ICategory;
