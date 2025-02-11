import styled from "styled-components";
import { IMaskInput } from "react-imask";

export const StyledField = styled.div`
   display: flex;
   flex-direction: column;
   gap: 0.25rem;
`;

export const StyledInput = styled.input`
   padding: 0.75rem;
   border-radius: 0.75rem;
   border: 1px solid ${({ theme }) => theme.colors.neutral.color4};

   color: ${({ theme }) => theme.colors.neutral.color6};
   font-size: 1rem;

   &:focus {
      outline: none;
   }

   &::placeholder {
      color: ${({ theme }) => theme.colors.neutral.color3};
   }
`;

export const StyledInputMask = styled(IMaskInput)`
   padding: 0.75rem;
   border-radius: 0.75rem;
   border: 1px solid ${({ theme }) => theme.colors.neutral.color4};

   color: ${({ theme }) => theme.colors.neutral.color6};
   font-size: 1rem;

   &:focus {
      outline: none;
   }

   &::placeholder {
      color: ${({ theme }) => theme.colors.neutral.color3};
   }
`;

export const StyledSelect = styled.select`
   padding: 0.75rem;
   border-radius: 0.75rem;
   border: 1px solid ${({ theme }) => theme.colors.neutral.color4};

   color: ${({ theme }) => theme.colors.neutral.color6};
   font-size: 1rem;

   &:focus {
      outline: none;
   }

   &::placeholder {
      color: ${({ theme }) => theme.colors.neutral.color3};
   }
`;

export const StyledFieldTitle = styled.div`
   display: flex;
   align-items: flex-end;
   justify-content: space-between;
   gap: 0.25rem;
`;

export const StyledLabel = styled.label`
   font-size: 1rem;
   color: ${({ theme }) => theme.colors.neutral.color6};
   white-space: nowrap;
   width: fit-content;
`;

export const StyledErrorSpan = styled.span`
   display: flex;
   font-size: 0.75rem;
   color: ${({ theme }) => theme.colors.alerts.fail};
   max-height: 0.75rem;
   align-items: flex-end;
   text-align: right;
`;
