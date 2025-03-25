import styled from "styled-components";

export const StyledModalHeader = styled.section`
   padding: 0.75rem;
   background-color: ${({ theme }) => theme.colors.neutral.color2};
   box-shadow: ${({ theme }) => theme.colors.other.shadow};
`;

export const StyledModalHeaderTitle = styled.h2`
   color: ${({ theme }) => theme.colors.neutral.color7};
   font-weight: ${({ theme }) => theme.fonts.roboto.regular};
   font-size: 1.25rem;
`;
