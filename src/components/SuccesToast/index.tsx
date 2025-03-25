import { StyledDialog } from "@/src/components/Modalzz/modal.styles";
import ModalHeader from "@/src/components/Modalzz/modalHeader";
import ModalBody from "@/src/components/Modalzz/attentionModal/modalBody";
import ModalFooter from "@/src/components/Modalzz/modalFooter";
import { ToastContentProps } from "react-toastify";

type CustomNotificationProps = ToastContentProps<{
   title: string;
   message: string;
}>;

export function SuccesToast({ closeToast, data }: CustomNotificationProps) {
   return (
      <StyledDialog $width="24rem">
         <ModalHeader>{data.title}</ModalHeader>
         <ModalBody>{data.message}</ModalBody>
         <ModalFooter
            uniqueButton
            color="green"
            onSubmit={closeToast}
            onCancel={() => {}}
         >
            Ok
         </ModalFooter>
      </StyledDialog>
   );
}
