import styled from "styled-components";

interface StyledCardProps {
   $isPreferential?: boolean;
}

export const CardContainer = styled.div<StyledCardProps>`
   display: grid;
   gap: 1.25rem;
   width: 60%;
   grid-template-columns: 1fr 1fr;
   word-break: break-word;
   position: relative;
   background-color: ${({ theme }) => theme.colors.neutral.color};
   box-shadow: ${({ theme }) => theme.colors.other.shadow};
   padding: 1.25rem;
   border-radius: 1.25rem;

   outline: ${({ $isPreferential, theme }) =>
      $isPreferential && `${theme.colors.primary.color3} 0.25rem solid`};

   @media screen and (max-width: 1200px) {
      grid-template-columns: 1fr;
   }
`;

export const ButtonsContainer = styled.div`
   display: flex;
   gap: 1rem;
   justify-content: flex-end;
   align-items: center;
   position: absolute;
   top: 0.75rem;
   right: 0.75rem;
`;
