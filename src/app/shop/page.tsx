"use client";

import Footer from "@/src/components/Footer";
import Header from "@/src/components/Header";
import Unlogged from "@/src/components/Unlogged";
import useAuthStore from "@/src/store/CustomerShopStore";
import { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import { MainContainer, BodyContainer } from "./styles";
import Product from "@/src/components/Product";
import IBook from "@/src/interfaces/IBook";

export default function Shop() {
   const { customer, loadUser } = useAuthStore();

   useEffect(() => {
      loadUser();
   }, []);

   if (!customer) {
      return <Unlogged />;
   }

   const book1: IBook = {
      nome: "O Senhor dos Anéis",
      autor: "J. R. R. Tolkien",
      slug: "senhor-dos-aneis",
      preco: 50.0,
   };

   const book2: IBook = {
      nome: "O pequeno príncipe",
      autor: "Antoine de Saint-Exupéry",
      slug: "o-pequeno-principe",
      preco: 25.0,
   };

   const book3: IBook = {
      nome: "Harry Potter",
      autor: "J. K. Rowling",
      slug: "harry-potter",
      preco: 250.0,
   };

   const book4: IBook = {
      nome: "Orgulho e Preconceito",
      autor: "Jane Austen",
      slug: "orgulho-e-preconceito",
      preco: 400.5,
   };

   return (
      <BodyContainer>
         <ToastContainer />
         <Header />
         <MainContainer>
            <Product book={book1} />
            <Product book={book2} />
            <Product book={book3} />
            <Product book={book4} />
            <Product book={book1} />
            <Product book={book2} />
            <Product book={book3} />
            <Product book={book4} />
            <Product book={book1} />
            <Product book={book2} />
            <Product book={book3} />
            <Product book={book4} />
         </MainContainer>
         <Footer />
      </BodyContainer>
   );
}
