import { createContext, PropsWithChildren, useState } from "react";

export const CategoryFilterContext = createContext({
   slug: "",
   setSlug: (slug: string) => {},
});

CategoryFilterContext.displayName = "CategoryFilter";

export const CategoryFilterProvider = ({ children }: PropsWithChildren) => {
   const [slug, setSlug] = useState<string>("");

   return (
      <CategoryFilterContext.Provider value={{ slug, setSlug }}>
         {children}
      </CategoryFilterContext.Provider>
   );
};
