import styled from "styled-components";

interface StyledLinkProps {
   $active?: boolean;
}

export const NavItemContainer = styled.button<StyledLinkProps>`
   background-color: ${({ $active, theme }) =>
      $active ? theme.colors.primary.color3 : "transparent"};
   color: ${(props) =>
      props.$active
         ? props.theme.colors.neutral.color
         : props.theme.colors.neutral.color6};
   display: flex;
   padding: 0.75rem;
   gap: 0.5rem;
   border: none;
   border-radius: 0.5rem;
   min-width: 100%;

   ${({ $active }) => !$active && "cursor: pointer"};

   &:hover {
      background-color: ${({ $active, theme }) =>
         !$active && theme.colors.other.hoverBackground};
   }
`;
