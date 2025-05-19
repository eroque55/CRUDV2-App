'use client';

import ButtonComponent from '@/src/components/Button';
import { Title } from '@/src/components/Title';
import { useEffect, useState } from 'react';
import ListCustomers from '@/src/components/ListCustomers';
import FilterCustomer from '@/src/components/FilterCustomer';
import ModalCreateCustomer from '@/src/components/ModalCustomerCreate';
import { useCountries, useCountries2 } from '@/src/store/CountryStore';
import { CustomerFilterProvider } from '@/src/context/CustomerFilterContext';
import { StyledContentHeader, StyledContentHeaderOptions } from '../styles';

const Admin = () => {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const { fetchCountries } = useCountries();
  const { fetchCountries: fetchCountries2 } = useCountries2();

  useEffect(() => {
    fetchCountries();
    fetchCountries2();
  }, []);

  return (
    <CustomerFilterProvider>
      <ModalCreateCustomer isOpen={isCreateOpen} setIsOpen={setIsCreateOpen} />
      <FilterCustomer isOpen={isFilterOpen} setIsOpen={setIsFilterOpen} />
      <StyledContentHeader>
        <Title>Clientes</Title>
        <StyledContentHeaderOptions>
          <ButtonComponent
            width="15rem"
            wired
            onClick={() => setIsFilterOpen(true)}
            icon="FilterIcon"
          >
            Filtrar
          </ButtonComponent>
          <ButtonComponent
            width="15rem"
            onClick={() => setIsCreateOpen(true)}
            icon="PlusIcon"
          >
            Cadastrar cliente
          </ButtonComponent>
        </StyledContentHeaderOptions>
      </StyledContentHeader>
      <ListCustomers />
    </CustomerFilterProvider>
  );
};

export default Admin;
