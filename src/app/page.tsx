"use client";

import NavBar from "@/src/components/NavBar";
import CustomerList from "@/src/components/CustomerListing/CustomersList";
import ContentHeader from "@/src/components/CustomerListing/ContentHeader";

import { StyledMain, StyledContent } from "./page.styles";
import ExitModal from "@/src/components/NavBar/ExitModal";
import DeleteModal from "@/src/components/CustomerListing/DeleteModal";
import CreateCustomerFlow from "../components/CustomerListing/CreateCustomerFlow";

export default function Home() {
   return (
      <>
         <DeleteModal />
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
