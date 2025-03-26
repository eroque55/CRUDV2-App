import styled from "styled-components";

export const StyledHeader = styled.header`
   display: flex;
   flex-direction: column;
   width: 100%;
   height: 7.5rem;
   padding-bottom: 1rem;
   gap: 2.75rem;
`;

export const TabsContainer = styled.div`
   display: flex;
   gap: 0.5rem;
`;

interface StyledTabsProps {
   $active?: boolean;
}

export const StyledTabs = styled.button<StyledTabsProps>`
   color: ${({ theme, $active }) =>
      $active ? theme.colors.primary.color3 : theme.colors.neutral.color5};
   font-size: 1.25rem;
   font-weight: 700;
   padding: 0.25rem 0.75rem;
   background: none;
   border: none;
   cursor: pointer;
   transition: 0.3s;
   border-radius: 1rem;

   &:hover {
      background-color: ${({ theme }) => theme.colors.other.hoverBackground};
   }
`;

export const PageContainer = styled.section`
   display: flex;
   flex-direction: column;
   gap: 2rem;
   padding: 2rem;
   align-items: center;

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

export const ActionsContainer = styled.div`
   display: flex;
   justify-content: space-between;
   align-items: flex-end;
   height: 2rem;
`;
