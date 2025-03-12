import styled from "styled-components";

export const StyledFilterButton = styled.button`
   display: flex;
   padding: 0.75rem 2rem;
   align-items: center;
   gap: 0.5rem;
   border-radius: 0.75rem;
   border: 2px solid ${({ theme }) => theme.colors.primary.color3};
   cursor: pointer;

   color: ${({ theme }) => theme.colors.primary.color3};
   font-family: ${({ theme }) => theme.fonts.roboto.fontFamily};
   font-weight: ${({ theme }) => theme.fonts.roboto.bold};
   font-size: 1rem;

   &:hover {
      filter: ${({ theme }) => theme.colors.outers.hoverFilter};
   }
`;
