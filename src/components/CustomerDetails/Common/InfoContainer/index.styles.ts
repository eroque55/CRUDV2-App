import styled from "styled-components";

export const StyledContainer = styled.ul`
   display: grid;
   flex-direction: column;
   gap: 1.25rem;
   width: 60%;
   grid-template-columns: 1fr 1fr;

   background-color: ${({ theme }) => theme.colors.neutral.color};
   box-shadow: ${({ theme }) => theme.colors.outers.shadow};
   padding: 1.25rem;
   border-radius: 1.25rem;
`;

export const StyledInfoContainer = styled.li`
   display: flex;
   flex-direction: column;
`;

export const StyledInfoTitle = styled.h3`
   font-size: 1rem;
   font-weight: 400;
   color: ${({ theme }) => theme.colors.neutral.color5};
`;

export const StyledInfoContent = styled.p`
   font-size: 1.25rem;
   color: ${({ theme }) => theme.colors.neutral.color8};
`;
