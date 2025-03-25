import styled from "styled-components";

export const StyledModalBody = styled.section`
   padding: 0.75rem;
   display: flex;
   flex-direction: column;
   gap: 0.5rem;
   flex-grow: 1;
`;

export const StyledModalBodyTitle = styled.h2`
   font-size: 1rem;
   color: ${({ theme }) => theme.colors.neutral.color6};
   font-weight: ${({ theme }) => theme.fonts.roboto.regular};
`;

export const StyledModalBodyText = styled.p`
   font-size: 0.875rem;
   color: ${({ theme }) => theme.colors.neutral.color4};
   font-weight: ${({ theme }) => theme.fonts.roboto.regular};
`;
