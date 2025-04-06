import styled from "styled-components";

export const Container = styled.div`
   display: flex;
   gap: 1rem;
`;

export const ImageContainer = styled.div`
   display: flex;
   width: 12rem;
   height: 12rem;
   border-radius: 0.75rem;
   background-color: ${({ theme }) => theme.colors.neutral.color2};
   justify-content: center;
   align-items: center;
   padding: 0.75rem;
`;

export const ContentContainer = styled.div`
   display: flex;
   flex-direction: column;
   justify-content: center;
   gap: 0.75rem;
   flex: 1;
`;

export const BookTitle = styled.h3`
   font-size: 1.125rem;
   font-weight: 600;
   color: ${({ theme }) => theme.colors.neutral.color7};
`;

export const BookAuthor = styled.p`
   color: ${({ theme }) => theme.colors.neutral.color6};
`;

export const BookQtdContainer = styled.div`
   display: flex;
   align-items: center;
   padding: 1rem;
   gap: 1.5rem;
   border-radius: 0.5rem;
   background-color: ${({ theme }) => theme.colors.neutral.color2};

   font-size: 1.125rem;
   color: ${({ theme }) => theme.colors.neutral.color8};
`;

export const ValueContainer = styled.div`
   display: flex;
   align-items: center;
   gap: 1.25rem;
`;

export const Value = styled.h3`
   font-size: 1.25rem;
   font-weight: 600;
   color: ${({ theme }) => theme.colors.neutral.color7};
`;
