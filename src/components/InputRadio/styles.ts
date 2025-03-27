import styled from "styled-components";

export const InputRadioContent = styled.div`
   display: flex;
   gap: 0.25rem;
   align-items: center;

   input {
      appearance: none;
      width: 1.25rem;
      height: 1.25rem;
      border-radius: 50%;
      border: 1px solid ${({ theme }) => theme.colors.neutral.color3};
      transition: 0.2s all linear;
   }

   input:checked {
      border: none;
      background: ${({ theme }) => theme.colors.alerts.success};
      background-image: url("/icons/CheckWhite.svg");
      background-repeat: no-repeat;
      background-position: center;
   }
`;
