import Link from "next/link";
import styled from "styled-components";

export const StyledHeader = styled.header`
   display: flex;
   flex-direction: column;
   align-items: flex-start;
   align-self: stretch;
`;

export const HelloContainer = styled.div`
   display: flex;
   padding: 1.25rem 2.5rem 0.75rem 2.5rem;
   justify-content: space-between;
   align-items: center;
   align-self: stretch;
   background-color: ${({ theme }) => theme.colors.neutral.color2};
`;

export const StyledHello = styled.h2`
   font-size: 1.5rem;
   font-weight: 700;
   color: ${({ theme }) => theme.colors.neutral.color6};

   strong {
      color: ${({ theme }) => theme.colors.primary.color3};
   }
`;

export const StyledLogoutButton = styled.button`
   display: flex;
   align-items: center;
   gap: 0.75rem;
   font-size: 1.25rem;
   font-weight: 700;
   color: ${({ theme }) => theme.colors.primary.color3};
   background-color: transparent;
   border: none;
   cursor: pointer;
`;
