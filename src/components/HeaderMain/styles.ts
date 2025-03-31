import styled from "styled-components";

export const HeaderMainContainer = styled.div`
   display: flex;
   width: 100%;
   padding: 1.25rem 2.5rem;
   justify-content: space-between;
   align-items: center;
`;

export const ActionsContainer = styled.div`
   display: flex;
   align-items: center;
   gap: 0.5rem;
`;

export const StyledButton = styled.button`
   background-color: transparent;
   border: none;
   display: flex;
   flex-direction: column;
   justify-content: center;
   align-items: center;
   gap: 0.5rem;
   color: ${({ theme }) => theme.colors.neutral.color8};
   font-size: 1rem;
   cursor: pointer;
   border-radius: 1rem;

   &:hover {
      background-color: ${({ theme }) => theme.colors.neutral.color2};
   }
`;
