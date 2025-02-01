import styled from "styled-components";

interface StyledTableHeaderProps {
   $textAlign?: string;
}

export const StyledTableHeader = styled.p<StyledTableHeaderProps>`
   color: ${({ theme }) => theme.colors.neutros.cor5};
   font-size: 1rem;
   font-weight: 400;
   width: 100%;
   text-align: ${({ $textAlign }) => ($textAlign ? $textAlign : "left")};
`;
