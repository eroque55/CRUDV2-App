import { useEffect, useState } from "react";
import axios from "axios";

import Cliente from "@/src/@types/ICliente";
import TableBody from "../ListsComponents/TableBody";

import { StyledTable } from "./index.styles";
import TableHeader from "../ListsComponents/TableHeader";

export default function ListaClientes() {
   const [clientes, setClientes] = useState<Cliente[]>([]);

   useEffect(() => {
      async function fetchData() {
         const response = await axios.get("http://192.168.15.146:8000/cliente");
         const data: Cliente[] = await response.data;
         setClientes(data);
      }

      fetchData();
   }, []);

   return (
      <StyledTable>
         <TableHeader colunas={["Nome", "CPF", "E-mail"]} />
         {clientes.map((cliente) => (
            <TableBody key={cliente._id} cliente={cliente} />
         ))}
      </StyledTable>
   );
}
