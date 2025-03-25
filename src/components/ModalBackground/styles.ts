import styled from "styled-components";

interface Props {
   $align?: "center" | "left";
}

export const ModalBackgroundContainer = styled.div<Props>`
   display: flex;
   width: 100vw;
   height: 100vh;
   background: ${({ theme }) => theme.colors.other.modalBackground};
   position: fixed;
   top: 0;
   left: 0;
   z-index: 1000;

   ${({ $align }) => {
      if ($align === "left") {
         return `
            justify-content: flex-end;
         `;
      } else {
         return `
            justify-content: center;
            align-items: center;
         `;
      }
   }}
`;
