import ModalHeader from "../ModalHeader";
import ModalBody from "./ModalBody";
import ModalFooter from "../ModalFooter";

import { StyledDialog, StyledOverlay } from "./index.styles";

interface Props {
   isOpen: boolean;
   title: string;
   children: React.ReactNode;
   notice?: string;
   actionButton: string;
   closeModal: () => void;
   submitModal: () => void;
}

export default function Modal({
   isOpen,
   title,
   children,
   notice,
   actionButton,
   closeModal,
   submitModal,
}: Props) {
   if (!isOpen) return null;

   return (
      <StyledOverlay>
         <StyledDialog>
            <ModalHeader>{title}</ModalHeader>
            <ModalBody notice={notice}>{children}</ModalBody>
            <ModalFooter
               onCancel={closeModal}
               onSubmit={submitModal}
               colors="red"
            >
               {actionButton}
            </ModalFooter>
         </StyledDialog>
      </StyledOverlay>
   );
}
