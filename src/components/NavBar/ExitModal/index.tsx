import { useSairModalStore } from "@/src/store/NavBarStore";
import Modal from "../../Modal";

export default function ExitModal() {
   const { ExitIsOpen: isOpen, exitCloseModal: closeModal } =
      useSairModalStore();
   return (
      <Modal
         isOpen={isOpen}
         title="Sair da conta"
         actionButton="Sair"
         closeModal={closeModal}
      >
         Tem certeza que deseja sair da conta?
      </Modal>
   );
}
