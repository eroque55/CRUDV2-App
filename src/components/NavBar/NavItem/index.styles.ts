import styled from "styled-components";
import Link from "next/link";

interface StyledLinkProps {
   $ativo: boolean;
}

export const StyledLink = styled(Link)<StyledLinkProps>`
   background-color: ${({ $ativo, theme }) =>
      $ativo && theme.colors.primary.color3};
   color: ${(props) =>
      props.$ativo
         ? props.theme.colors.neutral.color
         : props.theme.colors.neutral.color6};
   display: flex;
   padding: 0.75rem;
   gap: 0.5rem;
   border-radius: 0.5rem;
   min-width: 100%;
   ${({ $ativo }) => $ativo && "pointer-events: none;"};

   &:hover {
      background-color: ${({ $ativo, theme }) =>
         !$ativo && theme.colors.outers.hoverBackground};
   }
`;

export const StyledText = styled.p`
   font-size: 1rem;
   font-weight: 400;
   white-space: nowrap;
`;
