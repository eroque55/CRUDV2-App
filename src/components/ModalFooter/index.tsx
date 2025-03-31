import { ModalFooterContainer, ModalFooterButton } from "./styles";

interface Props {
   confirmButtonType?: "button" | "submit";
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
   confirmButtonType = "button",
}: Props) => {
   return (
      <ModalFooterContainer>
         {cancelButton && (
            <ModalFooterButton type="button" onClick={cancelAction}>
               {cancelButton}
            </ModalFooterButton>
         )}
         <ModalFooterButton
            type={confirmButtonType}
            onClick={(e) => {
               e.preventDefault();
               confirmAction();
            }}
         >
            {children}
         </ModalFooterButton>
      </ModalFooterContainer>
   );
};

export default ModalFooter;
