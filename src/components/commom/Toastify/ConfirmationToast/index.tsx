import { StyledDialog } from "@/src/components/Commom/Modal/modal.styles";
import ModalHeader from "@/src/components/Commom/Modal/ModalHeader";
import ModalBody from "@/src/components/Commom/Modal/AttentionModal/ModalBody";
import ModalFooter from "@/src/components/Commom/Modal/ModalFooter";
import { toast, ToastContentProps } from "react-toastify";
import { SuccesToast } from "../SuccesToast";

type CustomNotificationProps = ToastContentProps<{
   title: string;
   message: string;
   notice?: string;
   notConfirmation?: boolean;
   actionButton: string;
   successMessage: string;
   onSubmit: () => void;
}>;

export function ConfirmationToast({
   closeToast,
   data,
}: CustomNotificationProps) {
   const handleSubmit = () => {
      data.onSubmit();
      if (!data.notConfirmation) {
         toast(SuccesToast, {
            data: {
               title: "Sucesso!",
               message: data.successMessage,
            },
            autoClose: false,
            position: "top-center",
            closeButton: false,
            hideProgressBar: true,
         });
      }
      closeToast();
   };

   return (
      <StyledDialog $width="24rem">
         <ModalHeader>{data.title}</ModalHeader>
         <ModalBody notice={data.notice}>{data.message}</ModalBody>
         <ModalFooter color="red" onSubmit={handleSubmit} onCancel={closeToast}>
            {data.actionButton}
         </ModalFooter>
      </StyledDialog>
   );
}
