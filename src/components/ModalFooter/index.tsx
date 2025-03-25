import { ModalFooterContainer, ModalFooterButton } from "./styles";

interface Props {
   children: React.ReactNode;
   cancelButton?: string;
   confirmAction: () => void;
   cancelAction: () => void;
}

const ModalFooter = ({
   children,
   cancelButton,
   cancelAction,
   confirmAction,
}: Props) => {
   return (
      <ModalFooterContainer>
         {cancelButton && (
            <ModalFooterButton onClick={cancelAction}>
               {cancelButton}
            </ModalFooterButton>
         )}
         <ModalFooterButton onClick={confirmAction}>
            {children}
         </ModalFooterButton>
      </ModalFooterContainer>
   );
};

export default ModalFooter;
