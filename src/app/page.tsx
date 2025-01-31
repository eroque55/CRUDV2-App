"use client";

import { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";

import NavBar from "../components/NavBar";
import Titulo from "@/src/components/Titulo";
import Cliente from "../@types/ICliente";

const ContainerMain = styled.main`
   height: 100vh;
   width: 100vw;
   background-color: ${({ theme }) => theme.colors.neutros.cor2};
   padding: 0.75rem;
   display: flex;
   gap: 1rem;
`;

const ContainerPrincipal = styled.section`
   width: 100%;
   height: 100%;
   padding: 1.75rem 1rem 0rem 1rem;
`;

const StyledHeader = styled.header`
   display: flex;
   flex-direction: column;
   gap: 1rem;
`;

const Opcoes = styled.div`
   display: flex;
   gap: 1.25rem;
   align-items: center;
   justify-content: flex-end;
`;

const BarraPesquisa = styled.input`
   width: 350px;
   padding: 0.75rem;
   border-radius: 0.75rem;
   background: ${({ theme }) => theme.colors.neutros.cor};
   box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.25);
   border: none;

   &:focus {
      outline: none;
   }
`;

const BotaoAdicionar = styled.button`
   display: flex;
   width: 160px;
   padding: 0.75rem;
   justify-content: center;
   align-items: center;
   gap: 10px;
   border-radius: 0.75rem;
   background: ${({ theme }) => theme.colors.principal.cor3};
   box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.25);
   border: none;
   color: ${({ theme }) => theme.colors.neutros.cor};
`;

const BotaoFiltrar = styled.button``;

const Home = () => {
   const [listaClientes, setListaClientes] = useState<Cliente[]>([]);

   useEffect(() => {
      async function fetchClientes() {
         try {
            const response = await axios.get("http://127.0.0.1:3001/cliente/");
            setListaClientes(response.data);
         } catch (error) {
            console.error("Erro ao buscar clientes:", error);
         }
      }
      fetchClientes();
   }, []); // Executa apenas uma vez quando o componente é montado

   console.log(listaClientes);

   return (
      <ContainerMain>
         <NavBar />
         <ContainerPrincipal>
            <StyledHeader>
               <Titulo>Lista de Clientes</Titulo>
               <Opcoes>
                  <BarraPesquisa placeholder="Pesquisar" />
                  <BotaoAdicionar>Adicionar</BotaoAdicionar>
               </Opcoes>
            </StyledHeader>
         </ContainerPrincipal>
      </ContainerMain>
   );
};

export default Home;
