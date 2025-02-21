import styled from "styled-components";

export const StyledOverlay = styled.div`
   display: flex;
   width: 100vw;
   height: 100vh;
   background: ${({ theme }) => theme.colors.outers.modalBackground};
   position: fixed;
   z-index: 1000;
   justify-content: flex-end;
`;

export const StyledFilterContainer = styled.aside`
   display: flex;
   width: 18.75rem;
   height: 100%;
   padding: 1.25rem;
   flex-direction: column;
   align-items: flex-start;
   background: ${({ theme }) => theme.colors.neutral.color};
   box-shadow: ${({ theme }) => theme.colors.outers.shadow};
`;

export const SyledFilterHeader = styled.header`
   display: flex;
   width: 100%;
   padding-bottom: 1.25rem;
   border-bottom: 1px solid ${({ theme }) => theme.colors.neutral.color3};
   justify-content: space-between;
`;

export const StyledFilterTitle = styled.h2`
   color: ${({ theme }) => theme.colors.primary.color3};
   font-size: 1.5rem;
   font-weight: 700;
`;

export const StyledCloseButton = styled.button`
   display: flex;
   width: 2rem;
   height: 2rem;
   justify-content: center;
   align-items: center;
   border: none;
   background: none;
   cursor: pointer;
   transition: all 0.2s;
   border-radius: 50%;

   &:hover {
      background: ${({ theme }) => theme.colors.outers.hoverBackground};
   }
`;

export const StyledFilterForm = styled.form`
   display: flex;
   flex-direction: column;
   align-items: center;
   width: 100%;
   height: 100%;
   padding: 0 0.5rem 0rem 0;

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

export const StyledFilterField = styled.div`
   display: flex;
   padding: 0.75rem 0rem;
   flex-direction: column;
   align-items: flex-start;
   gap: 0.3125rem;
   align-self: stretch;

   border-bottom: 1px solid ${({ theme }) => theme.colors.neutral.color3};
`;

export const StyledFilterButtonsContainer = styled.div`
   width: 100%;
   display: flex;
   padding-top: 1.25rem;
   flex-direction: column;
   align-items: center;
   gap: 0.5rem;
   border-top: 1px solid ${({ theme }) => theme.colors.neutral.color3};
`;

export const StyledFilterButton = styled.button`
   display: flex;
   width: 10rem;
   padding: 0.625rem 0rem;
   justify-content: center;
   align-items: center;
   gap: 0.625rem;
   border-radius: 0.5rem;
   background: none;
   border: 2px solid ${({ theme }) => theme.colors.primary.color3};
   color: ${({ theme }) => theme.colors.primary.color3};
   font-weight: 700;
   cursor: pointer;
   transition: all 0.2s;
   font-size: 1rem;

   &:hover {
      background: ${({ theme }) => theme.colors.outers.hoverBackground};
   }
`;

export const StyledFilterClear = styled.button`
   color: var(--Principal-Color-3, #01497c);
   font-family: Roboto;
   font-size: 1rem;
   font-style: normal;
   font-weight: 700;
   line-height: normal;
   text-decoration-line: underline;
   text-decoration-style: solid;
   text-decoration-skip-ink: none;
   text-decoration-thickness: auto;
   text-underline-offset: auto;
   text-underline-position: from-font;
   cursor: pointer;
   background: none;
   border: none;
`;
