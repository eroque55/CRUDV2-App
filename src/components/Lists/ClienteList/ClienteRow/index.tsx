"use client";

import { useState } from "react";
import { updateClienteStatus } from "@/src/services/ClienteService";
import Cliente from "@/src/@types/ICliente";

import {
   StyledRowBodyActions,
   StyledRowBodyContent,
   StyledRow,
   StyledRowBodyText,
} from "../../common/lists.styles";
import ActionButton from "../../common/ActionButton";
import lixeira from "@/public/icons/lixeira.svg";
import detalhes from "@/public/icons/detalhes.svg";
import Switch from "../../common/Switch";

interface Props {
   cliente: Cliente;
}

export default function ClienteRow({ cliente }: Props) {
   const [status, setStatus] = useState(cliente._status);

   async function toggleStatus() {
      try {
         const response = cliente;
         response._status = !cliente._status;
         await updateClienteStatus(response);
         setStatus(response._status);
      } catch (error: any) {
         console.error("Erro ao atualizar status do cliente", error);
      }
   }

   return (
      <StyledRow>
         <StyledRowBodyContent>
            <StyledRowBodyText>{cliente._nome}</StyledRowBodyText>
            <StyledRowBodyText>{cliente._cpf}</StyledRowBodyText>
            <StyledRowBodyText>{cliente._email}</StyledRowBodyText>
         </StyledRowBodyContent>
         <StyledRowBodyActions>
            <Switch status={status} onToggle={toggleStatus}></Switch>
            <ActionButton icon={lixeira} onClick={() => {}} />
            <ActionButton icon={detalhes} onClick={() => {}} />
         </StyledRowBodyActions>
      </StyledRow>
   );
}
