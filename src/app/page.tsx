"use client";

import NavBar from "../components/NavBar";
import Titulo from "@/src/components/Title";
import ListaClientes from "../components/ListaClientes";

import mais from "@/public/icons/mais.svg";

import {
   BarraPesquisa,
   BotaoAdicionar,
   ContainerMain,
   ContainerPrincipal,
   Opcoes,
   StyledHeader,
} from "./page.styles";
import Image from "next/image";

export default function Home() {
   return (
      <ContainerMain>
         <NavBar />
         <ContainerPrincipal>
            <StyledHeader>
               <Titulo>Lista de Clientes</Titulo>
               <Opcoes>
                  <BarraPesquisa placeholder="Pesquisar" type="search" />
                  <BotaoAdicionar>
                     <Image
                        src={mais}
                        width={16}
                        height={16}
                        alt="Icone de mais"
                     />
                     Adicionar
                  </BotaoAdicionar>
               </Opcoes>
               <ListaClientes />
            </StyledHeader>
         </ContainerPrincipal>
      </ContainerMain>
   );
}
