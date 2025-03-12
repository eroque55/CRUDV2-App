import { useSairModalStore } from "@/src/store/NavBarStore";
import Modal from "../../common/modal/attentionModal";

export default function ExitModal() {
   const { ExitIsOpen: isOpen, exitCloseModal: closeModal } =
      useSairModalStore();

   return (
      <Modal
         isOpen={isOpen}
         title="Sair da conta"
         actionButton="Sair"
         closeModal={closeModal}
         submitModal={() => {
            window.location.href = "/";
         }}
         color="red"
      >
         Tem certeza que deseja sair da conta?
      </Modal>
   );
}
