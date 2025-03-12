import styled from "styled-components";

interface StyledButtonProps {
   $wired?: boolean;
}

export const StyledButton = styled.button<StyledButtonProps>`
   display: flex;
   padding: 0.75rem 0rem;
   justify-content: center;
   align-items: center;
   align-self: stretch;
   border-radius: 0.5rem;

   font-family: Roboto;
   font-size: 1.25rem;
   font-style: normal;
   font-weight: 500;
   line-height: normal;
   color: ${({ theme, $wired }) =>
      $wired ? theme.colors.primary.color3 : theme.colors.neutral.color};
   background-color: ${({ theme, $wired }) =>
      $wired ? "transparent" : theme.colors.primary.color3};
   border: ${({ theme, $wired }) =>
      $wired ? `2px solid ${theme.colors.primary.color3}` : "none"};

   cursor: pointer;

   &:hover {
      filter: ${({ theme }) => theme.colors.outers.hoverFilter};
      background-color: ${({ theme, $wired }) =>
         $wired && theme.colors.outers.hoverBackground};
   }
`;
