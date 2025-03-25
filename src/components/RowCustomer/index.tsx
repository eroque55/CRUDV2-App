import ICustomer from "@/src/interfaces/ICustomer";
import Row from "../Row";
import { formatCpf } from "@/src/utils";
import { useState } from "react";
import {
   deleteCustomer,
   updateCustomer,
} from "@/src/services/Customer.service";
import { useCustomerStore } from "@/src/store/CustomerListingStore";
import { toast } from "react-toastify";
import { ConfirmationToast } from "../ConfirmationToast";
import { useRouter } from "next/navigation";

interface Props {
   customer: ICustomer;
}

const RowCustomer = ({ customer }: Props) => {
   const [status, setStatus] = useState(customer.status);
   const { fetchCustomers } = useCustomerStore();
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
         await fetchCustomers();
      } catch (error: any) {
         console.error("Erro ao excluir cliente", error);
      }
   }

   const trashAction = () => {
      toast(ConfirmationToast, {
         data: {
            title: "Tem certeza?",
            message: "Tem certeza que deseja excluir esse cliente?",
            notice: "Essa ação não poderá ser desfeita",
            successMessage: "Cliente excluído com sucesso!",
            actionButton: "Excluir",
            onSubmit: handleDelete,
         },
         autoClose: false,
         position: "top-center",
         closeButton: false,
         hideProgressBar: true,
      });
   };

   const collumns = [customer.name, formatCpf(customer.cpf), customer.email];

   const switchIcon = status ? "SwitchOn" : "SwitchOff";

   return (
      <Row
         content={collumns}
         actions={[
            { name: switchIcon, onClick: toggleStatus, height: 20 },
            { name: "TrashIcon", onClick: trashAction },
            {
               name: "EyeIcon",
               onClick: () => router.push(`/admin/customer/${customer.id}`),
            },
         ]}
      ></Row>
   );
};

export default RowCustomer;
