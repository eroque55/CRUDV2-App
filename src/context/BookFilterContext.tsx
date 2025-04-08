import { createContext, PropsWithChildren, useState } from "react";

export const BookFilterContext = createContext({
   title: "",
   setTitle: (title: string) => {},
});

BookFilterContext.displayName = "BookFilter";

export const BookFilterProvider = ({ children }: PropsWithChildren) => {
   const [title, setTitle] = useState<string>("");

   return (
      <BookFilterContext.Provider value={{ title, setTitle }}>
         {children}
      </BookFilterContext.Provider>
   );
};
