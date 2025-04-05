"use client";
import { ToastContainer } from "react-toastify";
import { MainContainer, BodyContainer } from "./styles";
import Product from "@/src/components/Product";
import useBookFilter from "@/src/hooks/useCustomerFilter copy";
import { getBooks } from "@/src/services/Book.service";
import Loader from "@/src/components/Loader";

export default function Shop() {
   const { filter } = useBookFilter();
   const { data: books, isLoading } = getBooks(filter);

   return (
      <BodyContainer>
         <ToastContainer />
         <MainContainer>
            {isLoading && <Loader />}
            {books?.map((book) => (
               <Product book={book} key={book.id} />
            ))}
         </MainContainer>
      </BodyContainer>
   );
}
