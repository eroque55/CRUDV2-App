import { StyledDialog, StyledOverlay } from "./index.styles";

import ModalHeader from "../ModalHeader";
import ModalForm from "./ModalForm";
import ModalFooter from "../ModalFooter";
import ITextField from "@/src/@types/ITextField";
import {
   FieldValues,
   UseFormHandleSubmit,
   UseFormRegister,
} from "react-hook-form";
import { register } from "module";

interface Props {
   isOpen: boolean;
   title: string;
   actionButton: string;
   onCancel: () => void;
   onSubmit: () => void;
   fields: ITextField[];
   register: UseFormRegister<FieldValues>;
}

export default function FormModal({
   isOpen,
   title,
   actionButton,
   onCancel: closeModal,
   onSubmit: submitModal,
   fields,
   register,
}: Props) {
   if (!isOpen) return null;

   return (
      <StyledOverlay>
         <StyledDialog>
            <ModalHeader>{title}</ModalHeader>
            <ModalForm fields={fields} register={register} />
            <ModalFooter onCancel={closeModal} onSubmit={submitModal}>
               {actionButton}
            </ModalFooter>
         </StyledDialog>
      </StyledOverlay>
   );
}
