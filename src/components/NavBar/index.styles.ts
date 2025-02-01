import styled from "styled-components";

export const StyledNav = styled.nav`
   display: flex;
   flex-direction: column;
   background-color: ${({ theme }) => theme.colors.neutros.cor};
   border-radius: 0.5rem;
   box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.25);
   padding: 1.5rem 0.75rem;
   width: fit-content;
   height: 100%;
   gap: 1.5rem;
   align-items: center;
`;

export const StyledMenuList = styled.ul`
   display: flex;
   flex-direction: column;
   gap: 0.5rem;
   height: 100%;
`;
