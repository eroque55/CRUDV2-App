import styled from "styled-components";
import Image from "next/image";

export const StyledMain = styled.main`
   height: 100%;
   width: 100%;
   padding: 0.75rem;
   display: flex;
   justify-content: center;
   align-items: center;
   gap: 1rem;
   background: ${({ theme }) =>
      "linear-gradient(104deg, " +
      theme.colors.primary.color +
      " 1.95%, " +
      theme.colors.primary.color3 +
      " 98.05%)"};
`;

export const Wave1 = styled(Image)`
   position: fixed;
   bottom: 0;
   left: 0;
   z-index: 0;
`;

export const Wave2 = styled(Image)`
   position: fixed;
   top: 0;
   right: 0;
   z-index: 0;
`;

export const StyledContent = styled.section`
   display: flex;
   width: 32rem;
   height: fit-content;
   padding: 5rem 2.5rem;
   flex-direction: column;
   justify-content: center;
   align-items: center;
   gap: 3rem;
   border-radius: 1.25rem;
   background: rgba(255, 255, 255, 0.6);
   box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.25);
   backdrop-filter: blur(5px);
`;

export const StyledButtonContainer = styled.div`
   display: flex;
   flex-direction: column;
   gap: 1.25rem;
   width: 100%;
`;

export const BackContainer = styled.label`
   display: flex;
   gap: 0.5rem;
   align-items: center;
   font-size: 1.25rem;
   width: 100%;

   color: ${({ theme }) => theme.colors.primary.color3};
`;

export const BackButton = styled.button`
   width: 2rem;
   height: 2rem;
   background: transparent;
   border: none;
   cursor: pointer;
   display: flex;
   align-items: center;
   justify-content: center;
   border-radius: 1rem;

   &:hover {
      background: ${({ theme }) => theme.colors.outers.hoverBackground};
   }
`;

export const CreateAccount = styled.button`
   font-size: 1rem;
   color: ${({ theme }) => theme.colors.primary.color3};
   background: transparent;
   border: none;
   cursor: pointer;
   text-decoration: underline;
`;
