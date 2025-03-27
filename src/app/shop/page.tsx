"use client";

// import { StyledToastContainer } from "@/src/components/Toastify/index.styles";
import Header from "@/src/components/Header";
import Unlogged from "@/src/components/Unlogged";
import useAuthStore from "@/src/store/CustomerShopStore";
import { useEffect } from "react";

export default function Shop() {
   const { customer, loadUser } = useAuthStore();

   useEffect(() => {
      loadUser();
   }, []);

   if (!customer) {
      return <Unlogged />;
   }

   return (
      <>
         <Header />
      </>
   );
}
