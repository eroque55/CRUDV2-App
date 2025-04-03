"use client";

import { getCategories } from "@/src/services/Categories.service";
import { HeaderCategoriesContainer, StyledCategory } from "./styles";
import { useEffect, useState } from "react";
import ICategory from "@/src/interfaces/ICategory";
import useBookFilter from "@/src/hooks/useCustomerFilter copy";
import { getBooks } from "@/src/services/Book.service";
import IBook from "@/src/interfaces/IBook";

const HeaderCategories = () => {
   const [categories, setCategories] = useState<ICategory[]>([]);
   const { filter, setFilter } = useBookFilter();
   const { refetch } = getBooks(filter);

   const handleClick = (category: ICategory) => {
      const newFilter: Partial<IBook> = {};
      setFilter(newFilter);
      refetch();
   };

   useEffect(() => {
      const fetchCategories = async () => {
         try {
            const categories = await getCategories();

            setCategories(categories);
         } catch (error) {
            console.error("Error fetching categories:", error);
         }
      };

      fetchCategories();
   });

   return (
      <HeaderCategoriesContainer>
         {categories.map((category) => (
            <StyledCategory onClick={() => {}} key={category.id}>
               {category.name}
            </StyledCategory>
         ))}
      </HeaderCategoriesContainer>
   );
};

export default HeaderCategories;
