"use client";

import NavBar from "@/src/components/NavBar";
import ListaClientes from "@/src/components/Lists/CustomersList";
import ContentHeader from "@/src/components/ContentHeader";

import { StyledMain, StyledContent } from "./page.styles";
import ExitModal from "@/src/components/NavBar/ExitModal";
import DeleteModal from "@/src/components/Lists/CustomersList/DeleteModal";
import CreateCustomerFlow from "../components/Lists/CustomersList/CreateCustomerFlow";

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
               <ListaClientes />
            </StyledContent>
         </StyledMain>
      </>
   );
}
