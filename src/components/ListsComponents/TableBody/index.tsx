"use client";

import { StyledTableBody } from "./index.styles";
import {
   StyledRowActions,
   StyledRowContent,
   StyledTableRow,
} from "../table.styles";

import Cliente from "@/src/@types/ICliente";

interface Props {
   cliente: Cliente;
}

export default function ClienteRow({ cliente }: Props) {
   return (
      <StyledTableRow>
         <StyledRowContent>
            <StyledTableBody>{cliente._nome}</StyledTableBody>
            <StyledTableBody>{cliente._cpf}</StyledTableBody>
            <StyledTableBody>{cliente._email}</StyledTableBody>
         </StyledRowContent>
         <StyledRowActions></StyledRowActions>
      </StyledTableRow>
   );
}
