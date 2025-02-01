import styled from "styled-components";

interface StyledTableRowProps {
   $header?: boolean;
}

export const StyledTableRow = styled.li<StyledTableRowProps>`
   display: flex;
   padding: 0.75rem 1.25rem;
   align-items: center;
   gap: 2rem;
   align-self: stretch;
   width: 100%;
   border-radius: 0.75rem;
   background: ${({ theme }) => theme.colors.neutros.cor};
   box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.25);

   &:hover {
      background-color: ${({ $header }) =>
         $header ? "" : "rgba(0, 0, 0, 0.05)"};
   }
`;

export const StyledRowContent = styled.div`
   display: flex;
   align-items: center;
   gap: 2rem;
   width: 100%;
   text-align: left;
`;

export const StyledRowActions = styled.div`
   width: 20%;
   text-align: center;
`;
