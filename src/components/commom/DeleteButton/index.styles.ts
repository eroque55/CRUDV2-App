import styled from "styled-components";

export const StyledActionButton = styled.button`
   padding: 0.5rem;
   width: 2rem;
   height: 2rem;
   border-radius: 100%;
   box-shadow: ${({ theme }) => theme.colors.outers.shadow};
`;
