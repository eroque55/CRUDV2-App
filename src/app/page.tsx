"use client";

import styled from "styled-components";
import NavBar from "../components/NavBar";

const ContainerMain = styled.main`
   height: 100vh;
   width: 100vw;
   background-color: ${({ theme }) => theme.colors.neutros.cor2};
   padding: 0.75rem;
`;

export default function Home() {
   return (
      <ContainerMain>
         <NavBar />
      </ContainerMain>
   );
}
