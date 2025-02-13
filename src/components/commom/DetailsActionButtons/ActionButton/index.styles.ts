import styled from "styled-components";

export const StyledActionButton = styled.button`
   display: flex;
   padding: 0.5rem;
   width: 2rem;
   height: 2rem;
   border-radius: 100%;
   background-color: ${({ theme }) => theme.colors.neutral.color};
   box-shadow: ${({ theme }) => theme.colors.outers.shadow};
   border: none;
   justify-content: center;
   align-items: center;
`;
