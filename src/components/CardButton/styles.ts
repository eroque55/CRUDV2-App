import styled from "styled-components";

export const CardButtonContainer = styled.button`
   display: flex;
   width: 2.5rem;
   height: 2.5rem;
   justify-content: center;
   align-items: center;
   border-radius: 50%;
   box-shadow: ${({ theme }) => theme.colors.other.shadow};
   border: none;
   cursor: pointer;
   background-color: transparent;

   &:hover {
      background-color: ${({ theme }) => theme.colors.other.hoverBackground};
   }
`;
