import styled from "styled-components";

interface SwitchProps {
   $active?: boolean;
}

export const StyledSwitch = styled.button<SwitchProps>`
   border-radius: 1rem;
   background-color: ${({ $active, theme }) =>
      $active ? theme.colors.alerts.success : theme.colors.neutral.color4};
   width: 2rem;
   border: none;
   height: 1.25rem;
   cursor: pointer;

   transition: background-position 0.3s;

   background-image: url("/icons/switch.svg");
   background-repeat: no-repeat;
   background-position: ${({ $active }) => ($active ? "9px" : "-1px")};
`;
