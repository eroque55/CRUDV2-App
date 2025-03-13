import styled from "styled-components";

export const StyledMain = styled.main`
   height: 100%;
   width: 100%;
   padding: 0.75rem;
   display: flex;
   gap: 1rem;
   background-color: ${({ theme }) => theme.colors.neutral.color2};
`;

export const StyledContent = styled.section`
   width: 100%;
   height: 100%;
   display: flex;
   flex-direction: column;
   gap: 1rem;
   padding: 1.75rem 1rem 0rem 1rem;
   overflow-y: auto;

   &::-webkit-scrollbar {
      width: 0.5rem;
   }

   &::-webkit-scrollbar-thumb {
      background-color: ${({ theme }) => theme.colors.neutral.color4};
      border-radius: 1rem;
   }

   &::-webkit-scrollbar-track {
      margin-top: 1rem;
      border-radius: 1rem;
   }
`;
