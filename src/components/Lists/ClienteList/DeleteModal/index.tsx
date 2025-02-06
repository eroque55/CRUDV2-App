import { useClienteStore, useDeleteModalStore } from "@/src/store/ClienteStore";
import Modal from "../../../Modal/AttentionModal";
import { deleteCliente } from "@/src/services/ClienteService";

export default function DeleteModal() {
   const { deleteCloseModal, deleteIsOpen, selecedItemId } =
      useDeleteModalStore();

   const { carregarClientes } = useClienteStore();

   async function handleDelete() {
      if (!selecedItemId) return;

      try {
         await deleteCliente(selecedItemId);
         deleteCloseModal();
         await carregarClientes();
      } catch (error: any) {
         console.error("Erro ao excluir cliente", error);
      }
   }

   return (
      <Modal
         isOpen={deleteIsOpen}
         title="Excluir cliente?"
         actionButton="Excluir"
         notice="Essa ação não poderá ser desfeita."
         closeModal={deleteCloseModal}
         submitModal={handleDelete}
      >
         Tem certeza que deseja excluír o cliente?
      </Modal>
   );
}
