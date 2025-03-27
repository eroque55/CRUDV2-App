import styled from "styled-components";

const Input = styled.input`
   padding: 0.75rem;
   border-radius: 0.75rem;
   border: 1px solid ${({ theme }) => theme.colors.neutral.color4};
   width: 100%;
   color: ${({ theme }) => theme.colors.neutral.color6};
   font-size: 1rem;

   &:focus {
      outline: none;
   }

   &::placeholder {
      color: ${({ theme }) => theme.colors.neutral.color3};
   }
`;

export default Input;
