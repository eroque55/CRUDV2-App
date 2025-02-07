import { StyledModalFooter, StyledModalFooterButton } from "./index.styles";

interface Props {
   children: React.ReactNode;
   onCancel: () => void;
   onSubmit: () => void;
   colors?: "blue" | "red" | "green";
}

export default function ModalFooter({
   children,
   onCancel: closeModal,
   onSubmit: submitModal,
   colors = "blue",
}: Props) {
   return (
      <StyledModalFooter>
         <StyledModalFooterButton
            $color={colors}
            $transparent
            onClick={closeModal}
         >
            Cancelar
         </StyledModalFooterButton>
         <StyledModalFooterButton onClick={submitModal} $color={colors}>
            {children}
         </StyledModalFooterButton>
      </StyledModalFooter>
   );
}
