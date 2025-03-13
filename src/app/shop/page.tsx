"use client";

import { StyledToastContainer } from "@/src/components/common/toastify/index.styles";
import Header from "@/src/components/shop/header";
import Unlogged from "@/src/components/shop/unlogged";
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
         <StyledToastContainer />
         <Header />
      </>
   );
}
