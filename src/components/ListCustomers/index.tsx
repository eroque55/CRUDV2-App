import Row from "../Row";
import { ListContainer } from "../List/styles";
import RowCustomer from "../RowCustomer";
import Loader from "../Loader/";
import { getCustomers } from "@/src/services/Customer.service";
import { errorModal } from "@/src/utils/Toasts";
import { useCustomerFilterStore } from "@/src/store/CustomerFilterStore";

const ListCustomers = () => {
   const { filter } = useCustomerFilterStore();
   const { data: customers, isLoading } = getCustomers(filter);

   const headerContent = ["Nome", "CPF", "E-mail"];

   if (isLoading) return <Loader />;

   if (!customers) throw errorModal("Erro ao carregar clientes");

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
