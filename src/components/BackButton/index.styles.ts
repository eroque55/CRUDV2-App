import styled from "styled-components";
import Link from "next/link";

export const StyledBackButton = styled(Link)`
   display: flex;
   width: 1.75rem;
   height: 1.75rem;
   align-items: center;
   justify-content: center;
   cursor: pointer;
   transition: 0.3s;
   border-radius: 100%;

   &:hover {
      background-color: ${({ theme }) => theme.colors.other.hoverBackground};
   }
`;
