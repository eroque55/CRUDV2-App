import styled from "styled-components";

export const FooterContainer = styled.footer`
   display: flex;
   padding: 1.25rem 2.5rem;
   align-items: center;
   width: 100%;
   background-color: ${({ theme }) => theme.colors.neutral.color2};
   color: ${({ theme }) => theme.colors.neutral.color7};
   font-size: 1.25rem;
`;
