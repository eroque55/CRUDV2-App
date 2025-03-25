import styled from "styled-components";

export const RowText = styled.p`
   color: ${({ theme }) => theme.colors.neutral.color7};
   font-size: 1rem;
   flex: 1 0 0;
   overflow: hidden;
   text-overflow: ellipsis;
   display: -webkit-box;
   -webkit-box-orient: vertical;
   -webkit-line-clamp: 1;
`;
