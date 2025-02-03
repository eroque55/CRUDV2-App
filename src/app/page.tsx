"use client";

import NavBar from "../components/NavBar";
import ListaClientes from "../components/Lists/ClienteList";
import ContentHeader from "../components/ContentHeader";

import { StyledMain, StyledContent } from "./page.styles";
import ExitModal from "../components/NavBar/ExitModal";
import DeleteModal from "../components/Lists/ClienteList/DeleteModal";

export default function Home() {
   return (
      <>
         <DeleteModal />
         <ExitModal />
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
