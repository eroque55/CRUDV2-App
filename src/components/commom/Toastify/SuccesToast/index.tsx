import { StyledDialog } from "@/src/components/Commom/Modal/modal.styles";
import ModalHeader from "@/src/components/Commom/Modal/ModalHeader";
import ModalBody from "@/src/components/Commom/Modal/AttentionModal/ModalBody";
import ModalFooter from "@/src/components/Commom/Modal/ModalFooter";
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
