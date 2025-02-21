"use client";

import { useState } from "react";
import { deleteCustomer, updateCustomer } from "@/src/services/CustomerService";

import {
   StyledRowBodyActions,
   StyledRowBodyContent,
   StyledRow,
   StyledRowBodyText,
} from "../../Commom/lists.styles";
import ActionButton from "../../Commom/RowActionButton";
import lixeira from "@/public/icons/lixeira.svg";
import Switch from "../../Commom/Switch";
import { useCustomerStore } from "@/src/store/CustomerListingStore";
import DetailsButton from "../../Commom/DetailsButton";
import { Customer } from "@/src/@types/api";
import { toast } from "react-toastify";
import { ConfirmationToast } from "../../Commom/Toastify/ConfirmationToast";

interface Props {
   customer: Customer;
}

export default function CustomerRow({ customer }: Props) {
   const [status, setStatus] = useState(customer.status);
   const { fetchCustomers } = useCustomerStore();

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

   const formattedCPF = `${customer.cpf.slice(0, 3)}.${customer.cpf.slice(
      3,
      6
   )}.${customer.cpf.slice(6, 9)}-${customer.cpf.slice(9, 11)}`;

   return (
      <StyledRow>
         <StyledRowBodyContent>
            <StyledRowBodyText>{customer.name}</StyledRowBodyText>
            <StyledRowBodyText>{formattedCPF}</StyledRowBodyText>
            <StyledRowBodyText>{customer.email}</StyledRowBodyText>
         </StyledRowBodyContent>
         <StyledRowBodyActions>
            <Switch status={status} onToggle={toggleStatus}></Switch>
            <ActionButton
               id={customer.id}
               icon={lixeira}
               onClick={() => {
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
               }}
            />
            <DetailsButton href={`/customer/${customer.id}`} />
         </StyledRowBodyActions>
      </StyledRow>
   );
}
