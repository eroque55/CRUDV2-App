import styled from "styled-components";

export const StyledExitItem = styled.button`
   color: ${({ theme }) => theme.colors.neutral.color6};
   background: none;
   display: flex;
   padding: 0.75rem;
   gap: 0.5rem;
   border-radius: 0.5rem;
   min-width: 100%;
   border: none;
   cursor: pointer;

   &:hover {
      background-color: ${({ theme }) => theme.colors.outers.hoverBackground};
   }
`;

export const StyledText = styled.p`
   font-size: 1rem;
   font-weight: 400;
   white-space: nowrap;
`;
