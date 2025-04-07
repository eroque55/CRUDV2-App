"use client";

import Footer from "@/src/components/Footer";
import Header from "@/src/components/Header";
import Unlogged from "@/src/components/Unlogged";
import { BookFilterProvider } from "@/src/context/BookFilterContext";
import useAuthStore from "@/src/store/CustomerShopStore";
import { PropsWithChildren, useEffect } from "react";
import { ToastContainer } from "react-toastify";

const ShopLayout = ({ children }: PropsWithChildren) => {
   const { customer, loadUser } = useAuthStore();

   useEffect(() => {
      loadUser();
   }, []);

   if (!customer) return <Unlogged />;

   return (
      <BookFilterProvider>
         <ToastContainer />
         {children}
         <Footer />
      </BookFilterProvider>
   );
};

export default ShopLayout;
