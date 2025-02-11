import { useSairModalStore } from "@/src/store/NavBarStore";
import Modal from "../../commom/Modal/AttentionModal";

export default function ExitModal() {
   const { ExitIsOpen: isOpen, exitCloseModal: closeModal } =
      useSairModalStore();
   return (
      <Modal
         isOpen={isOpen}
         title="Sair da conta"
         actionButton="Sair"
         closeModal={closeModal}
         submitModal={() => {}}
         color="red"
      >
         Tem certeza que deseja sair da conta?
      </Modal>
   );
}
