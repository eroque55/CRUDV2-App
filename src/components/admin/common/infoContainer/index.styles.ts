import styled from "styled-components";

export const StyledInfoContainer = styled.li`
   display: flex;
   flex-direction: column;
`;

export const StyledInfoTitle = styled.h3`
   font-size: 1rem;
   font-weight: 400;
   color: ${({ theme }) => theme.colors.neutral.color5};
`;

export const StyledInfoContent = styled.p`
   font-size: 1.25rem;
   color: ${({ theme }) => theme.colors.neutral.color8};
`;
