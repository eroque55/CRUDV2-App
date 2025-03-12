import styled from "styled-components";

interface StyledRowHeaderTextProps {
   $textAlign?: string;
}

export const StyledRowHeaderText = styled.p<StyledRowHeaderTextProps>`
   color: ${({ theme }) => theme.colors.neutral.color5};
   width: 100%;
   text-align: ${({ $textAlign }) => ($textAlign ? $textAlign : "left")};
`;
