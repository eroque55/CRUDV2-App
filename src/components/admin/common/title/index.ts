import styled from "styled-components";

interface TitleContainerProps {
   $align?: string;
}

export const StyledTitle = styled.h1<TitleContainerProps>`
   font-weight: 700;
   color: ${({ theme }) => theme.colors.primary.color3};
   text-align: ${({ $align }) => $align || "left"};
`;
