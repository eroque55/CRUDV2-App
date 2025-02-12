import {
   useCustomerStore,
   useDeleteModalStore,
} from "@/src/store/CustomerListingStore";
import Modal from "../../commom/Modal/AttentionModal";
import { deleteCustomer } from "@/src/services/CustomerService";

export default function DeleteModal() {
   const { deleteCloseModal, deleteIsOpen, selecedItemId } =
      useDeleteModalStore();

   const { fetchCustomers } = useCustomerStore();

   async function handleDelete() {
      if (!selecedItemId) return;

      try {
         await deleteCustomer(selecedItemId);
         deleteCloseModal();
         await fetchCustomers();
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
         color="red"
      >
         Tem certeza que deseja excluír o cliente?
      </Modal>
   );
}
