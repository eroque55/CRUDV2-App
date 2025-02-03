import styled from "styled-components";

export const StyledAddButton = styled.button`
   display: flex;
   padding: 0.75rem 3rem;
   align-items: center;
   gap: 0.5rem;
   border-radius: 0.75rem;
   background: ${({ theme }) => theme.colors.primary.color3};
   border: none;
   cursor: pointer;

   color: ${({ theme }) => theme.colors.neutral.color};
   font-family: ${({ theme }) => theme.fonts.roboto.fontFamily};
   font-weight: ${({ theme }) => theme.fonts.roboto.regular};
   font-size: 1rem;

   &:hover {
      filter: ${({ theme }) => theme.colors.outers.hoverFilter};
   }
`;
