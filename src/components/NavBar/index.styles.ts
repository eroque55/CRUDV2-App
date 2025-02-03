import styled from "styled-components";

export const StyledNav = styled.nav`
   display: flex;
   flex-direction: column;
   background-color: ${({ theme }) => theme.colors.neutral.color};
   border-radius: 0.5rem;
   box-shadow: ${({ theme }) => theme.colors.outers.shadow};
   padding: 1.5rem 0.75rem;
   width: fit-content;
   height: 100%;
   gap: 1.5rem;
   align-items: center;
   cursor: pointer;
`;

export const StyledMenuList = styled.ul`
   display: flex;
   flex-direction: column;
   gap: 0.5rem;
   height: 100%;
`;
