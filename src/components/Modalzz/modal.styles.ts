import styled from "styled-components";

export const StyledOverlay = styled.div`
   display: flex;
   width: 100vw;
   height: 100vh;
   background: ${({ theme }) => theme.colors.other.modalBackground};
   position: fixed;
   z-index: 1000;
   align-items: center;
   justify-content: center;
`;

interface StyledDialogProps {
   $width?: string;
}

export const StyledDialog = styled.dialog<StyledDialogProps>`
   display: flex;
   flex-direction: column;
   width: ${($props) => ($props.$width ? $props.$width : "40rem")};
   box-shadow: ${({ theme }) => theme.colors.other.shadow};
   border-radius: 0.5rem;
   border: none;
   padding: 0;
   overflow: hidden;
`;

export const StyledModalForm = styled.form`
   padding: 0.75rem;
   display: grid;
   gap: 1rem;
   grid-template-columns: 1fr 1fr;
`;
