import { ToastContentProps } from 'react-toastify';
import ModalBody from '../ModalBody';
import ModalFooter from '../ModalFooter';
import ModalHeader from '../ModalHeader';
import { errorModal, successModal } from '../../utils/Toasts';
import { ModalContainer } from './styles';

type Props = ToastContentProps<{
  title: string;
  message: string;
  notice?: string;
  confirmButton: string;
  confirmAction?: () => void;
  cancelButton?: string;
  cancelAction?: () => void;
  successMessage?: string;
}>;

const Modal = ({
  data: {
    title,
    message,
    notice,
    confirmButton,
    cancelButton,
    confirmAction,
    cancelAction,
    successMessage,
  },
  closeToast,
}: Props) => {
  const handleConfirm = async () => {
    try {
      confirmAction && (await confirmAction());
      successMessage && successModal(successMessage);
    } catch (e: any) {
      errorModal(e.response.data);
    }
    closeToast();
  };

  const handleCancel = () => {
    cancelAction && cancelAction();
    closeToast();
  };
  return (
    <ModalContainer $height="13rem">
      <ModalHeader>{title}</ModalHeader>

      <ModalBody notice={notice}>{message}</ModalBody>

      <ModalFooter
        confirmButtonType="button"
        cancelButton={cancelButton}
        confirmAction={handleConfirm}
        cancelAction={handleCancel}
      >
        {confirmButton}
      </ModalFooter>
    </ModalContainer>
  );
};

export default Modal;
