import Row from "../Row";
import { ListContainer } from "../List/styles";
import RowCustomer from "../RowCustomer";
import { useCustomersListStore } from "@/src/store/CustomerListStore";

const ListCustomers = () => {
   const { customers } = useCustomersListStore();
   const headerContent = ["Nome", "CPF", "E-mail"];

   return (
      <ListContainer>
         <Row content={headerContent} />
         {customers.map((customer) => (
            <RowCustomer key={customer.id} customer={customer} />
         ))}
      </ListContainer>
   );
};

export default ListCustomers;
