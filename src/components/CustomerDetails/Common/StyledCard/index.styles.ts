import styled from "styled-components";

export const StyledCard = styled.ul`
   display: grid;
   flex-direction: column;
   gap: 1.25rem;
   width: 60%;
   grid-template-columns: 1fr 1fr;

   background-color: ${({ theme }) => theme.colors.neutral.color};
   box-shadow: ${({ theme }) => theme.colors.outers.shadow};
   padding: 1.25rem;
   border-radius: 1.25rem;
`;
