"use client";

import { useState } from "react";
import { updateCustomerStatus } from "@/src/services/CustomerService";

import {
   StyledRowBodyActions,
   StyledRowBodyContent,
   StyledRow,
   StyledRowBodyText,
} from "../../commom/lists.styles";
import ActionButton from "../../commom/RowActionButton";
import lixeira from "@/public/icons/lixeira.svg";
import Switch from "../../commom/Switch";
import { useDeleteModalStore } from "@/src/store/CustomerListingStore";
import DetailsButton from "../../commom/DetailsButton";
import { Customer } from "@/src/@types/api";

interface Props {
   customer: Customer;
}

export default function CustomerRow({ customer }: Props) {
   const { deleteOpenModal } = useDeleteModalStore();
   const [status, setStatus] = useState(customer.status);

   async function toggleStatus() {
      try {
         const novoStatus = !status;

         setStatus(novoStatus);

         await updateCustomerStatus(customer.id, {
            ...customer,
            status: novoStatus,
         });
      } catch (error: any) {
         console.error("Erro ao atualizar status do cliente", error);

         setStatus(status);
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
               onClick={() => deleteOpenModal(customer.id)}
            />
            <DetailsButton href={`/customer/${customer.id}`} />
         </StyledRowBodyActions>
      </StyledRow>
   );
}
