import styled from "styled-components";

interface StyledCardProps {
   $isPreferential?: boolean;
}

export const StyledCard = styled.ul<StyledCardProps>`
   display: grid;
   gap: 1.25rem;
   width: 60%;
   grid-template-columns: 1fr 1fr;
   word-break: break-word;
   position: relative;

   background-color: ${({ theme }) => theme.colors.neutral.color};
   box-shadow: ${({ theme }) => theme.colors.outers.shadow};
   padding: 1.25rem;
   border-radius: 1.25rem;

   outline: ${({ $isPreferential, theme }) =>
      $isPreferential && theme.colors.primary.color3 + " 0.25rem solid"};

   @media screen and (max-width: 1200px) {
      grid-template-columns: 1fr;
   }
`;
