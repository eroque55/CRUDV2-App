import styled from "styled-components";

interface StyledRowProps {
   $header?: boolean;
}

export const StyledRow = styled.li<StyledRowProps>`
   display: flex;
   padding: 0.75rem 1.25rem;
   align-items: center;
   gap: 2rem;
   align-self: stretch;
   width: 100%;
   border-radius: 0.75rem;
   background: ${({ theme }) => theme.colors.neutral.color};
   box-shadow: ${({ theme }) => theme.colors.other.shadow};
   ${({ $header }) => !$header && "cursor: pointer;"}

   &:hover {
      background-color: ${({ $header, theme }) =>
         !$header && theme.colors.other.hoverBackground};
   }
`;

export const StyledRowBodyText = styled.p`
   color: ${({ theme }) => theme.colors.neutral.color7};
   font-size: 1rem;
   font-weight: 400;
   width: 100%;
   text-align: left;
`;

export const StyledRowBodyContent = styled.div`
   display: flex;
   align-items: center;
   gap: 2rem;
   width: 100%;
   text-align: left;
`;

export const StyledRowBodyActions = styled.div`
   width: 20%;
   text-align: center;
   max-height: 1.125rem;
   display: flex;
   gap: 0.75rem;
   justify-content: center;
   align-items: center;
`;
