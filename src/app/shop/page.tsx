"use client";

import Footer from "@/src/components/Footer";
import Header from "@/src/components/Header";
import Unlogged from "@/src/components/Unlogged";
import useAuthStore from "@/src/store/CustomerShopStore";
import { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import { MainContainer, BodyContainer } from "./styles";
import Product from "@/src/components/Product";
import useBookFilter from "@/src/hooks/useCustomerFilter copy";
import { getBooks } from "@/src/services/Book.service";
import Loader from "@/src/components/Loader";

export default function Shop() {
   const { customer, loadUser } = useAuthStore();
   const { filter } = useBookFilter();
   const { data: books, isLoading } = getBooks(filter);

   useEffect(() => {
      loadUser();
   }, []);

   if (!customer) return <Unlogged />;

   return (
      <BodyContainer>
         <ToastContainer />
         <Header />
         <MainContainer>
            {isLoading && <Loader />}
            {books?.map((book) => (
               <Product book={book} key={book.id} />
            ))}
         </MainContainer>
         <Footer />
      </BodyContainer>
   );
}
