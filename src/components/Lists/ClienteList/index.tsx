import { useClienteStore } from "@/src/store/ClienteStore";
import TableBody from "../ClienteList/ClienteRow";
import TableHeader from "../common/TableHeader";
import { StyledTable } from "./index.styles";
import { useEffect } from "react";

export default function ListaClientes() {
   const { clientes, carregarClientes } = useClienteStore();

   useEffect(() => {
      carregarClientes();
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
