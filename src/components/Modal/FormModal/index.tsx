import { StyledDialog, StyledOverlay } from "./index.styles";

import ModalHeader from "../ModalHeader";
import ModalForm from "./ModalForm";
import ModalFooter from "../ModalFooter";
import ITextField from "@/src/@types/ITextField";

interface Props {
   isOpen: boolean;
   title: string;
   actionButton: string;
   closeModal: () => void;
   submitModal: () => void;
   fields: ITextField[];
}

export default function FormModal({
   isOpen,
   title,
   actionButton,
   closeModal,
   submitModal,
   fields,
}: Props) {
   if (!isOpen) return null;

   return (
      <StyledOverlay>
         <StyledDialog>
            <ModalHeader>{title}</ModalHeader>
            <ModalForm fields={fields} />
            <ModalFooter closeModal={closeModal} submitModal={submitModal}>
               {actionButton}
            </ModalFooter>
         </StyledDialog>
      </StyledOverlay>
   );
}
