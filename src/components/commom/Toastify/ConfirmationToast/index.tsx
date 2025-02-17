import { StyledDialog } from "@/src/components/commom/Modal/modal.styles";
import ModalHeader from "@/src/components/commom/Modal/ModalHeader";
import ModalBody from "@/src/components/commom/Modal/AttentionModal/ModalBody";
import ModalFooter from "@/src/components/commom/Modal/ModalFooter";
import { toast, ToastContentProps } from "react-toastify";
import { SuccesToast } from "../SuccesToast";

type CustomNotificationProps = ToastContentProps<{
   title: string;
   message: string;
   notice?: string;
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
