"use client";

import { StyledContentHeader, StyledContentHeaderOptions } from "../styles";
import CreateCustomerFlow from "@/src/components/CreateCustomerFlow";
import ButtonComponent from "@/src/components/Button";
import {
   useCreateModalStore,
   useCustomerStore,
   useFilterModalStore,
} from "@/src/store/CustomerListingStore";
import { Title } from "@/src/components/Title";
import { useEffect } from "react";
import ListCustomers from "@/src/components/ListCustomers";
import FilterCustomer from "@/src/components/FilterCustomer";

export default function Admin() {
   const { filterOpenModal } = useFilterModalStore();
   const { createOpenModal } = useCreateModalStore();
   const { fetchCustomers } = useCustomerStore();

   useEffect(() => {
      fetchCustomers();
   }, []);

   return (
      <>
         <CreateCustomerFlow />
         <FilterCustomer />
         <StyledContentHeader>
            <Title>Clientes</Title>
            <StyledContentHeaderOptions>
               <ButtonComponent
                  width="15rem"
                  wired
                  onClick={filterOpenModal}
                  icon={"FilterIcon"}
               >
                  Filtrar
               </ButtonComponent>
               <ButtonComponent
                  width="15rem"
                  onClick={createOpenModal}
                  icon={"PlusIcon"}
               >
                  Cadastrar cliente
               </ButtonComponent>
            </StyledContentHeaderOptions>
         </StyledContentHeader>
         <ListCustomers />
      </>
   );
}
