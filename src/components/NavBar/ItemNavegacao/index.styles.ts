import styled from "styled-components";
import Link from "next/link";

interface StyledLinkProps {
   $ativo: boolean;
}

export const StyledLink = styled(Link)<StyledLinkProps>`
   background-color: ${(props) =>
      props.$ativo ? props.theme.colors.principal.cor3 : ""};
   color: ${(props) =>
      props.$ativo
         ? props.theme.colors.neutros.cor
         : props.theme.colors.neutros.cor6};
   display: flex;
   padding: 0.75rem;
   gap: 0.5rem;
   border-radius: 0.5rem;
   min-width: 100%;

   &:hover {
      background-color: ${(props) =>
         props.$ativo ? "" : "rgba(0, 0, 0, 0.05)"};
   }
`;

export const StyledText = styled.p`
   font-size: 1rem;
   font-weight: 400;
   white-space: nowrap;
`;
