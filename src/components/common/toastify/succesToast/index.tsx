import { StyledDialog } from "@/src/components/admin/common/modal/modal.styles";
import ModalHeader from "@/src/components/admin/common/modal/modalHeader";
import ModalBody from "@/src/components/admin/common/modal/attentionModal/modalBody";
import ModalFooter from "@/src/components/admin/common/modal/modalFooter";
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
