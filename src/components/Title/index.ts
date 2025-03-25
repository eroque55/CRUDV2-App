import styled from "styled-components";
import { theme } from "@/src/themes/client-layout";

const fontWeights = {
   regular: theme.fonts.roboto.regular,
   bold: theme.fonts.roboto.bold,
};

const fontColors = {
   blue: theme.colors.primary.color3,
   black: theme.colors.neutral.color8,
   gray: theme.colors.neutral.color6,
};

interface Props {
   $size?: number;
   $weight?: keyof typeof fontWeights;
   $color?: keyof typeof fontColors;
   $align?: "center" | "left" | "right";
}

export const Title = styled.h1<Props>`
   text-align: ${({ $align }) => $align || "left"};
   font-weight: ${({ $weight }) => fontWeights[$weight || "bold"]};
   color: ${({ $color }) => fontColors[$color || "blue"]};
   font-size: ${({ $size }) => $size || 2}rem;
`;

export const TitleContainer = styled.div`
   display: flex;
   align-items: center;
   gap: 0.75rem;
`;
