"use client";

import NavBar from "@/src/components/NavBar";
import CustomerList from "@/src/components/CustomerListing/CustomersList";
import ContentHeader from "@/src/components/CustomerListing/ContentHeader";

import { StyledMain, StyledContent } from "./page.styles";
import ExitModal from "@/src/components/NavBar/ExitModal";
import CreateCustomerFlow from "../components/CustomerListing/CreateCustomerFlow";
import { StyledToastContainer } from "../components/commom/Toastify/index.styles";

export default function Home() {
   return (
      <>
         <StyledToastContainer />
         <ExitModal />
         <CreateCustomerFlow />
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
