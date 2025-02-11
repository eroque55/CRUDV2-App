import { useCustomerStore } from "@/src/store/CustomerStore";
import TableBody from "../CustomerRow";
import TableHeader from "../../commom/TableHeader";
import { StyledTable } from "../index.styles";
import { useEffect } from "react";

export default function CustomerList() {
   const { customers, fetchCustomers } = useCustomerStore();

   useEffect(() => {
      fetchCustomers();
   }, []);

   return (
      <StyledTable>
         <TableHeader colunas={["Nome", "CPF", "E-mail"]} />
         {customers.map((customer) => (
            <TableBody key={customer._id} customer={customer} />
         ))}
      </StyledTable>
   );
}
