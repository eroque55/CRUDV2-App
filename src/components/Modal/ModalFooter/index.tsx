import { StyledModalFooter, StyledModalFooterButton } from "./index.styles";

interface Props {
   children: React.ReactNode;
   closeModal: () => void;
   submitModal: () => void;
   colors?: "blue" | "red" | "green";
}

export default function ModalFooter({
   children,
   closeModal,
   submitModal,
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
