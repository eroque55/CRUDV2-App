import styled from "styled-components";

export const StyledMain = styled.main`
   height: 100%;
   width: 100%;
   padding: 0.75rem;
   display: flex;
   gap: 1rem;
`;

export const StyledContent = styled.section`
   width: 100%;
   height: 100%;
   display: flex;
   flex-direction: column;
   padding: 1.75rem 1rem 0rem 1rem;
   z-index: 1;
`;

export const StyledBackgroud = styled.div`
   background-color: ${({ theme }) => theme.colors.neutral.color};
   box-shadow: ${({ theme }) => theme.colors.outers.shadow};
   height: 10rem;
   width: 100%;
   position: absolute;
   top: 0;
   left: 0;
   z-index: 0;
`;

export const TitleContainer = styled.div`
   display: flex;
   gap: 1rem;
   align-items: center;
`;

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
      background-color: ${({ theme }) => theme.colors.outers.hoverBackground};
   }
`;

export const StyledPage = styled.section`
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

export const StyledActions = styled.div`
   display: flex;
   justify-content: space-between;
   align-items: flex-end;
   height: 2rem;
`;
