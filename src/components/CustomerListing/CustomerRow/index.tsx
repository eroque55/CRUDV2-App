"use client";

import { useState } from "react";
import { updateCustomerStatus } from "@/src/services/CustomerService";
import ICustomer from "@/src/@types/ICustomer";

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

interface Props {
   customer: ICustomer;
}

export default function CustomerRow({ customer }: Props) {
   const { deleteOpenModal } = useDeleteModalStore();
   const [status, setStatus] = useState(customer._status);

   async function toggleStatus() {
      try {
         const novoStatus = !status;

         setStatus(novoStatus);

         await updateCustomerStatus(customer._id, {
            ...customer,
            _status: novoStatus,
         });
      } catch (error: any) {
         console.error("Erro ao atualizar status do cliente", error);

         setStatus(status);
      }
   }

   const formattedCPF = `${customer._cpf.slice(0, 3)}.${customer._cpf.slice(
      3,
      6
   )}.${customer._cpf.slice(6, 9)}-${customer._cpf.slice(9, 11)}`;

   return (
      <StyledRow>
         <StyledRowBodyContent>
            <StyledRowBodyText>{customer._name}</StyledRowBodyText>
            <StyledRowBodyText>{formattedCPF}</StyledRowBodyText>
            <StyledRowBodyText>{customer._email}</StyledRowBodyText>
         </StyledRowBodyContent>
         <StyledRowBodyActions>
            <Switch status={status} onToggle={toggleStatus}></Switch>
            <ActionButton
               id={customer._id}
               icon={lixeira}
               onClick={() => deleteOpenModal(customer._id)}
            />
            <DetailsButton href={`/customer/${customer._id}`} />
         </StyledRowBodyActions>
      </StyledRow>
   );
}
