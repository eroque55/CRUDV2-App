import Modal from "@/src/components/Modal";
import { toast } from "react-toastify";

export const errorModal = (message: string) =>
   toast(Modal, {
      data: {
         title: "Erro!",
         message,
         confirmButton: "OK",
      },
      toastId: "errorModal",
      position: "top-center",
      autoClose: false,
      closeButton: false,
      hideProgressBar: true,
   });

export interface IConfirmationToast {
   title: string;
   message: string;
   notice?: string;
   confirmButton: string;
   cancelButton: string;
   confirmAction: () => void;
   succesMessage?: string;
}

export const confirmationModal = ({
   title,
   message,
   notice,
   confirmButton,
   confirmAction,
   cancelButton,
   succesMessage,
}: IConfirmationToast) => {
   toast(Modal, {
      data: {
         title,
         message,
         notice,
         confirmButton,
         cancelButton,
         confirmAction,
         succesMessage,
      },
      toastId: "confirmationModal",
      position: "top-center",
      autoClose: false,
      closeButton: false,
      hideProgressBar: true,
   });
};

export const successModal = (message: string) => {
   toast(Modal, {
      data: {
         title: "Sucesso!",
         message,
         confirmButton: "OK",
      },
      toastId: "succesModal",
      position: "top-center",
      autoClose: false,
      closeButton: false,
      hideProgressBar: true,
   });
};
