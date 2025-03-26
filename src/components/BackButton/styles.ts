import styled from "styled-components";

export const BackButtonContainer = styled.button`
   display: flex;
   width: 1.75rem;
   height: 1.75rem;
   align-items: center;
   justify-content: center;
   cursor: pointer;
   border-radius: 100%;
   border: none;
   background-color: transparent;

   &:hover {
      background-color: ${({ theme }) => theme.colors.other.hoverBackground};
   }
`;
