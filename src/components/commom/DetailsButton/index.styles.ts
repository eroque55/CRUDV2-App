import Link from "next/link";
import styled from "styled-components";

export const StyledLink = styled(Link)`
   border: none;
   background: none;
   width: 2rem;
   height: 2rem;
   border-radius: 100%;
   cursor: pointer;

   &:hover {
      background-color: ${({ theme }) => theme.colors.outers.hoverBackground};
   }
`;
