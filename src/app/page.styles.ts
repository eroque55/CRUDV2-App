import styled from "styled-components";

import lupa from "../../public/icons/lupa.svg";

export const ContainerMain = styled.main`
   height: 100vh;
   width: 100vw;
   background-color: ${({ theme }) => theme.colors.neutros.cor2};
   padding: 0.75rem;
   display: flex;
   gap: 1rem;
`;

export const ContainerPrincipal = styled.section`
   width: 100%;
   height: 100%;
   padding: 1.75rem 1rem 0rem 1rem;
`;

export const StyledHeader = styled.header`
   display: flex;
   flex-direction: column;
   gap: 1rem;
`;

export const Opcoes = styled.div`
   display: flex;
   gap: 1.25rem;
   align-items: center;
   justify-content: flex-end;
`;

export const BarraPesquisa = styled.input`
   width: 30%;
   padding: 0.75rem 0.75rem 0.75rem 2rem;
   border-radius: 0.75rem;
   background: ${({ theme }) => theme.colors.neutros.cor};
   box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.25);
   border: none;
   background-image: url("/icons/lupa.svg");
   background-repeat: no-repeat;
   background-position-y: 50%;
   background-position-x: 0.5rem;

   &:focus {
      outline: none;
   }
`;

export const BotaoAdicionar = styled.button`
   display: flex;
   padding: 0.75rem 3rem;
   justify-content: center;
   align-items: center;
   gap: 0.5rem;
   border-radius: 0.75rem;
   background: ${({ theme }) => theme.colors.principal.cor3};
   box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.25);
   border: none;
   color: ${({ theme }) => theme.colors.neutros.cor};
`;
