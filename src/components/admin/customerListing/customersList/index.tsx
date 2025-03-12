import { useCustomerStore } from "@/src/store/CustomerListingStore";
import TableBody from "../customerRow";
import TableHeader from "../../common/tableHeader";
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
            <TableBody key={customer.id} customer={customer} />
         ))}
      </StyledTable>
   );
}
