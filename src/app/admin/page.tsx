"use client";

import NavBar from "@/src/components/admin/navBar";
import CustomerList from "@/src/components/admin/customerListing/customersList";
import ContentHeader from "@/src/components/admin/customerListing/contentHeader";

import { StyledMain, StyledContent } from "./page.styles";
import ExitModal from "@/src/components/admin/navBar/exitModal";
import CreateCustomerFlow from "@/src/components/admin/customerListing/createCustomerFlow";
import { StyledToastContainer } from "@/src/components/common/toastify/index.styles";
import CustomerFilter from "@/src/components/admin/customerListing/customerFilter";

export default function Admin() {
   return (
      <>
         <StyledToastContainer />
         <ExitModal />
         <CreateCustomerFlow />
         <CustomerFilter />
         <StyledMain>
            <NavBar />
            <StyledContent>
               <ContentHeader>Lista de clientes</ContentHeader>
               <CustomerList />
            </StyledContent>
         </StyledMain>
      </>
   );
}
