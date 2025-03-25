import styled from "styled-components";
import { DefaultTheme } from "styled-components/dist/types";

export const StyledModalFooter = styled.menu`
   display: flex;
   justify-content: flex-end;
   padding: 0.75rem;
   gap: 0.5rem;
   border-top: 1px solid ${({ theme }) => theme.colors.neutral.color2};
`;

interface StyledModalFooterButtonProps {
   $color: "blue" | "red" | "green";
   $transparent?: boolean;
}

export const StyledModalFooterButton = styled.button<StyledModalFooterButtonProps>`
   padding: 0.25rem;
   width: 7.5rem;
   border-radius: 0.5rem;
   cursor: pointer;
   font-size: 1rem;

   ${({ $color, $transparent, theme }) => {
      const buttonColor = switch$color($color, theme);
      return `
         color: ${$transparent ? buttonColor : theme.colors.neutral.color};
         background: ${$transparent ? "transparent" : buttonColor};
         border: ${$transparent ? `1.5px solid ${buttonColor}` : "none"};
      `;
   }}

   &:hover {
      filter: ${({ theme }) => theme.colors.other.hoverFilter};
   }
`;

const colorMap = (theme: DefaultTheme) => ({
   blue: theme.colors.primary.color3,
   red: theme.colors.alerts.fail,
   green: theme.colors.alerts.success,
});

function switch$color(color: "blue" | "red" | "green", theme: DefaultTheme) {
   return colorMap(theme)[color];
}
