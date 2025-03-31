import styled from "styled-components";

export const StyledSearchConatiner = styled.div`
   display: flex;
   width: 22rem;
   padding: 0.75rem;
   align-items: center;
   gap: 0.75rem;
   border-radius: 0.75rem;
   background-color: ${({ theme }) => theme.colors.neutral.color2};
`;

export const StyledSearchInput = styled.input`
   display: flex;
   align-items: center;
   flex-grow: 1;
   font-size: 1rem;
   color: ${({ theme }) => theme.colors.neutral.color6};
   background-color: transparent;
   border: none;

   &::placeholder {
      color: ${({ theme }) => theme.colors.neutral.color3};
   }

   &:focus {
      outline: none;
   }
`;
