import useClientes from "@/src/hooks/useClientes";
import TableBody from "../ClienteList/ClienteRow";
import TableHeader from "../common/TableHeader";
import { StyledTable } from "./index.styles";

export default function ListaClientes() {
   const clientes = useClientes();

   return (
      <StyledTable>
         <TableHeader colunas={["Nome", "CPF", "E-mail"]} />
         {clientes.map((cliente) => (
            <TableBody key={cliente._id} cliente={cliente} />
         ))}
      </StyledTable>
   );
}
