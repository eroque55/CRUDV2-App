import ICustomer from "@/src/interfaces/ICustomer";
import Row from "../Row";
import { formatCpf } from "@/src/utils";
import { useState } from "react";
import {
   deleteCustomer,
   getCustomers,
   updateCustomer,
} from "@/src/services/Customer.service";
import { useRouter } from "next/navigation";
import { confirmationModal } from "@/src/utils/Toasts";
import useCustomerFilter from "@/src/hooks/useCustomerFilter";

interface Props {
   customer: ICustomer;
}

const RowCustomer = ({ customer }: Props) => {
   const [status, setStatus] = useState(customer.status);
   const { filter } = useCustomerFilter();
   const { refetch } = getCustomers(filter);
   const router = useRouter();

   async function toggleStatus() {
      try {
         const novoStatus = !status;

         setStatus(novoStatus);

         await updateCustomer(customer.id, { status: novoStatus });
      } catch (error: any) {
         console.error("Erro ao atualizar status do cliente", error);

         setStatus(status);
      }
   }

   async function handleDelete() {
      try {
         await deleteCustomer(customer.id);
         await refetch();
      } catch (error: any) {
         console.error("Erro ao excluir cliente", error);
      }
   }

   const trashAction = () => {
      confirmationModal({
         title: "Tem certeza?",
         message: "Tem certeza que deseja excluir esse cliente?",
         notice: "Essa ação não poderá ser desfeita",
         successMessage: "Cliente excluído com sucesso!",
         confirmButton: "Excluir",
         confirmAction: handleDelete,
         cancelButton: "Cancelar",
      });
   };

   const collumns = [customer.name, formatCpf(customer.cpf), customer.email];

   const switchIcon = status ? "SwitchOn" : "SwitchOff";

   return (
      <Row
         content={collumns}
         actions={[
            { name: switchIcon, onClick: toggleStatus, height: 20 },
            { name: "TrashGrayIcon", onClick: trashAction },
            {
               name: "EyeIcon",
               onClick: () => router.push(`customers/customer/${customer.id}`),
            },
         ]}
      ></Row>
   );
};

export default RowCustomer;
