import { useContext } from "react";
import { BookFilterContext } from "@/src/context/BookFilterContext";

const useBookFilter = () => {
   const { filter, setFilter } = useContext(BookFilterContext);

   return { filter, setFilter };
};

export default useBookFilter;
