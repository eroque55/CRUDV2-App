import { useContext } from "react";
import { CategoryFilterContext } from "@/src/context/CategoryFilterContext";

const useCategoryFilter = () => {
   const { slug, setSlug } = useContext(CategoryFilterContext);

   return { slug, setSlug };
};

export default useCategoryFilter;
