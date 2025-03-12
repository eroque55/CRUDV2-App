import ModalHeader from "../modalHeader";
import ModalBody from "./modalBody";
import ModalFooter from "../modalFooter";

import { StyledDialog, StyledOverlay } from "./index.styles";

interface Props {
   isOpen: boolean;
   title: string;
   children: React.ReactNode;
   notice?: string;
   uniqueButton?: boolean;
   actionButton: string;
   closeModal?: () => void;
   submitModal: () => void;
   color?: "red" | "green" | "blue";
}

export default function Modal({
   isOpen,
   title,
   children,
   notice,
   actionButton,
   closeModal,
   submitModal,
   color = "blue",
   uniqueButton = false,
}: Props) {
   if (!isOpen) return null;

   return (
      <StyledOverlay>
         <StyledDialog>
            <ModalHeader>{title}</ModalHeader>
            <ModalBody notice={notice}>{children}</ModalBody>
            <ModalFooter
               onCancel={closeModal ? closeModal : () => {}}
               onSubmit={submitModal}
               color={color}
               uniqueButton={uniqueButton}
            >
               {actionButton}
            </ModalFooter>
         </StyledDialog>
      </StyledOverlay>
   );
}
