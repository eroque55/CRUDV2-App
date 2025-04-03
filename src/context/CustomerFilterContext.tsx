import { createContext, PropsWithChildren, useState } from "react";
import ICustomer from "../interfaces/ICustomer";

export const CustomerFilterContext = createContext({
   filter: {},
   setFilter: (filter: {}) => {},
});

CustomerFilterContext.displayName = "CustomerFilter";

export const CustomerFilterProvider = ({ children }: PropsWithChildren) => {
   const [filter, setFilter] = useState<Partial<ICustomer>>({});

   return (
      <CustomerFilterContext.Provider value={{ filter, setFilter }}>
         {children}
      </CustomerFilterContext.Provider>
   );
};
