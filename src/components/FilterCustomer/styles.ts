import styled from "styled-components";

export const StyledFilterContainer = styled.form`
   display: flex;
   width: 18.75rem;
   height: 100%;
   padding: 1.25rem;
   flex-direction: column;
   align-items: flex-start;
   background: ${({ theme }) => theme.colors.neutral.color};
   box-shadow: ${({ theme }) => theme.colors.other.shadow};
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

export const StyledFilterForm = styled.div`
   display: flex;
   flex-direction: column;
   align-items: center;
   width: 100%;
   height: 100%;
   padding: 0.5rem 0.5rem 0rem 0;
   gap: 0.75rem;

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

export const StyledFilterButtonsContainer = styled.div`
   width: 100%;
   display: flex;
   padding-top: 1.25rem;
   flex-direction: column;
   align-items: center;
   gap: 0.5rem;
   border-top: 1px solid ${({ theme }) => theme.colors.neutral.color3};
`;

export const StyledFilterClear = styled.h3`
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
