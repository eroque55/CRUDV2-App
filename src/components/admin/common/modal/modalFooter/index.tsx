import { StyledModalFooter, StyledModalFooterButton } from "./index.styles";

interface Props {
   children: React.ReactNode;
   onCancel: () => void;
   onSubmit: () => void;
   color?: "red" | "green" | "blue";
   uniqueButton?: boolean;
}

export default function ModalFooter({
   children,
   onCancel: closeModal,
   onSubmit: submitModal,
   color = "blue",
   uniqueButton = false,
}: Props) {
   return (
      <StyledModalFooter>
         {!uniqueButton && (
            <StyledModalFooterButton
               $color={color}
               $transparent
               onClick={closeModal}
            >
               Cancelar
            </StyledModalFooterButton>
         )}
         <StyledModalFooterButton onClick={submitModal} $color={color}>
            {children}
         </StyledModalFooterButton>
      </StyledModalFooter>
   );
}
