import styled from "styled-components";

export const StyledSearchBar = styled.input`
   width: 30%;
   padding: 0.75rem 0.75rem 0.75rem 2rem;
   border-radius: 0.75rem;
   background: ${({ theme }) => theme.colors.neutral.color};
   box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.25);
   border: none;
   background-image: url("/icons/lupa.svg");
   background-repeat: no-repeat;
   background-position-y: 50%;
   background-position-x: 0.5rem;

   &:focus {
      outline: none;
   }
`;
