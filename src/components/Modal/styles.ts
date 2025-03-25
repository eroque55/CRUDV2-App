import styled from "styled-components";

interface ModalContainerProps {
   $width?: string;
   $height?: string;
}

export const ModalContainer = styled.dialog<ModalContainerProps>`
   display: flex;
   width: ${({ $width }) => $width || "22rem"};
   height: ${({ $height }) => $height || "auto"};
   flex-direction: column;
   border-radius: 0.5rem;
   border: none;
   padding: 0;
   overflow: hidden;

   box-shadow: ${({ theme }) => theme.colors.other.shadow};
`;

export const ModalBackground = styled.div`
   position: fixed;
   top: 0;
   left: 0;
   width: 100%;
   height: 100%;
   background-color: rgba(0, 0, 0, 0.2);
   display: flex;
   justify-content: center;
   align-items: center;
`;
