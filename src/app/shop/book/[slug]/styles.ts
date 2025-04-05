import styled from "styled-components";

export const BodyContainer = styled.div`
   display: flex;
   flex-direction: column;
   gap: 2.5rem;
   padding: 2rem 2.5rem;
   width: 100%;
   flex: 1;
`;

export const MainContainer = styled.div`
   display: flex;
   gap: 8rem;
`;

export const BookImageWrapper = styled.div`
   display: flex;
   height: 32rem;
   width: 45%;
   justify-content: center;
   align-items: center;
   border-radius: 1rem;
   background-color: ${({ theme }) => theme.colors.neutral.color2};
`;

export const BookInfoContainer = styled.div`
   display: flex;
   flex-direction: column;
   justify-content: space-between;
   flex: 1;
`;

export const BookInfoContentContainer = styled.div`
   display: flex;
   flex-direction: column;
   gap: 2rem;
`;

export const BookInfoHeader = styled.div`
   display: flex;
   justify-content: space-between;
   align-items: center;
`;

export const Publisher = styled.p`
   color: ${({ theme }) => theme.colors.neutral.color7};
   font-weight: 600;
`;

export const Id = styled.p`
   color: ${({ theme }) => theme.colors.neutral.color4};
   font-weight: 800;
`;

export const BookTitleContainer = styled.div`
   display: flex;
   flex-direction: column;
   gap: 0.5rem;
`;

export const BookTitle = styled.h2`
   color: ${({ theme }) => theme.colors.neutral.color8};
   font-size: 2rem;
   font-weight: 800;
`;

export const CategoryContainer = styled.div`
   display: flex;
   gap: 0.5rem;
   flex-wrap: wrap;
`;

export const Category = styled.div`
   padding: 0.25rem 0.75rem;
   border-radius: 1rem;
   background-color: ${({ theme }) => theme.colors.neutral.color2};

   color: ${({ theme }) => theme.colors.primary.color3};
   font-weight: 600;
`;

export const Author = styled.p`
   font-size: 1.25rem;
   color: ${({ theme }) => theme.colors.neutral.color7};
   font-weight: 600;
`;

export const Edition = styled.p`
   color: ${({ theme }) => theme.colors.neutral.color5};
`;

export const ValueContainer = styled.div`
   display: flex;
   flex-direction: column;
   gap: 0.5rem;
`;

export const Value = styled.h3`
   font-size: 2rem;
   font-weight: 800;
   color: ${({ theme }) => theme.colors.neutral.color8};
`;

export const Stock = styled.p`
   color: ${({ theme }) => theme.colors.neutral.color6};
   font-size: 1.25rem;
   font-weight: 400;

   strong {
      color: ${({ theme }) => theme.colors.neutral.color8};
      font-weight: 900;
   }
`;

export const DescriptionContainer = styled.div`
   display: flex;
   gap: 8rem;
`;

export const Synopsis = styled.p`
   font-size: 1.25rem;
   color: ${({ theme }) => theme.colors.neutral.color7};
   flex: 1;
   word-wrap: normal;
`;

export const DetailsTable = styled.div`
   display: flex;
   flex-direction: row;
`;

export const TableColumn = styled.div`
   display: flex;
   flex-direction: column;
`;

export const TableCell = styled.div`
   font-size: 1.25rem;
   color: ${({ theme }) => theme.colors.neutral.color7};
   padding: 0.5rem;
   border: 1px solid ${({ theme }) => theme.colors.neutral.color4};
`;
