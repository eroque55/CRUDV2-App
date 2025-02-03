import { StyledModalFooter, StyledModalFooterButton } from "./index.styles";

interface Props {
   children: React.ReactNode;
   closeModal: () => void;
   submitModal: () => void;
}

export default function ModalFooter({
   children,
   closeModal,
   submitModal,
}: Props) {
   return (
      <StyledModalFooter>
         <StyledModalFooterButton
            $color="red"
            $transparent
            onClick={closeModal}
         >
            Cancelar
         </StyledModalFooterButton>
         <StyledModalFooterButton onClick={submitModal} $color="red">
            {children}
         </StyledModalFooterButton>
      </StyledModalFooter>
   );
}
