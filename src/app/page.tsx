"use client";

import NavBar from "../components/NavBar";
import ListaClientes from "../components/Lists/ClienteList";
import ContentHeader from "../components/ContentHeader";

import { StyledMain, StyledContent } from "./page.styles";

export default function Home() {
   return (
      <StyledMain>
         <NavBar />
         <StyledContent>
            <ContentHeader>Lista de clientes</ContentHeader>
            <ListaClientes />
         </StyledContent>
      </StyledMain>
   );
}
