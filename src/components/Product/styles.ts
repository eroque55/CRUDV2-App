import styled from "styled-components";

export const ProductContainer = styled.div`
   display: flex;
   flex-direction: column;
   align-items: flex-start;
   gap: 1.25rem;
   width: 18rem;
`;

export const ImageContainer = styled.div`
   width: 100%;
   height: 18rem;
   background-color: ${({ theme }) => theme.colors.neutral.color2};
   display: flex;
   justify-content: center;
   align-items: center;
   border-radius: 0.5rem;
   padding: 1rem;
`;

export const StyledImage = styled.div`
   width: 100%;
   height: 100%;
   position: relative;
`;

export const DescriptionContainer = styled.div`
   display: flex;
   flex-direction: column;
   align-items: flex-start;
   gap: 0.5rem;
   align-self: stretch;
   width: 100%;
`;

export const StrongDescription = styled.h3`
   color: ${({ theme }) => theme.colors.neutral.color8};
   width: 100%;
   font-size: 1.25rem;
`;

export const Description = styled.p`
   color: ${({ theme }) => theme.colors.neutral.color6};
   width: 100%;
   font-size: 1rem;
   display: -webkit-box;
   -webkit-box-orient: vertical;
   text-overflow: ellipsis;
   -webkit-line-clamp: 1;
   overflow: hidden;
`;
