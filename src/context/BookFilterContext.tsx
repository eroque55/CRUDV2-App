import { createContext, PropsWithChildren, useState } from "react";
import IBook from "../interfaces/IBook";

export const BookFilterContext = createContext({
   filter: {},
   setFilter: (filter: Partial<IBook>) => {},
});

BookFilterContext.displayName = "BookFilter";

export const BookFilterProvider = ({ children }: PropsWithChildren) => {
   const [filter, setFilter] = useState<Partial<IBook>>({});

   return (
      <BookFilterContext.Provider value={{ filter, setFilter }}>
         {children}
      </BookFilterContext.Provider>
   );
};
