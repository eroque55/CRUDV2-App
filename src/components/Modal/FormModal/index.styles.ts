import styled from "styled-components";

export const StyledOverlay = styled.div`
   display: flex;
   width: 100vw;
   height: 100vh;
   background: ${({ theme }) => theme.colors.outers.modalBackground};
   position: fixed;
   z-index: 1000;
   align-items: center;
   justify-content: center;
`;

export const StyledDialog = styled.dialog`
   display: flex;
   flex-direction: column;
   width: 40rem;
   box-shadow: ${({ theme }) => theme.colors.outers.shadow};
   border-radius: 0.5rem;
   border: none;
   padding: 0;
   overflow: hidden;
`;
