'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Title, TitleContainer } from '@/src/components/Title';
import BackButton from '@/src/components/BackButton';

import ButtonComponent from '@/src/components/Button';
import IAddress from '@/src/interfaces/IAddress';
import ICard from '@/src/interfaces/ICard';
import CardCard from '@/src/components/CardCard';
import CardAddress from '@/src/components/CardAddress';
import CardPersonalData from '@/src/components/CardPersonalData';
import ModalAddressCreate from '@/src/components/ModalAddressCreate';
import ModalCardCreate from '@/src/components/ModalCardCreate';
import ModalAddressUpdate from '@/src/components/ModalAddressUpdate';
import { useCountries } from '@/src/store/CountryStore';
import ModalCustomerUpdate from '@/src/components/ModalCustomerUpdate';
import ModalCustomerPasswordUpdate from '@/src/components/ModalCustomerPasswordUpdate';
import { getCustomer } from '@/src/services/Customer.service';
import Loader from '@/src/components/Loader';
import {
  StyledHeader,
  StyledTabs,
  TabsContainer,
  ActionsContainer,
  PageContainer,
} from './styles';

const CustomerDetails = () => {
  const params = useParams();
  const { data: customer, isLoading } = getCustomer(Number(params.id));
  const [page, setPage] = useState(0);
  const [updateCustomerIsOpen, setUpdateCustomerIsOpen] = useState(false);
  const [updatePasswordIsOpen, setUpdatePasswordIsOpen] = useState(false);
  const [createAddressIsOpen, setCreateAddressIsOpen] = useState(false);
  const [createCardIsOpen, setCreateCardIsOpen] = useState(false);
  const { fetchCountries } = useCountries();

  useEffect(() => {
    fetchCountries();
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  const handlePageChange = (newPage: number) => setPage(newPage);

  const handleAddClick = () => {
    if (page === 0) {
      setUpdatePasswordIsOpen(true);
    }
    if (page === 1) {
      setCreateAddressIsOpen(true);
    }
    if (page === 2) {
      setCreateCardIsOpen(true);
    }
  };

  const buttonContent = () => {
    if (page === 0) {
      return 'Alterar senha';
    }
    if (page === 1) {
      return 'Adicionar endereço';
    }
    if (page === 2) {
      return 'Adicionar cartão';
    }
  };

  const buttonIcon = () => {
    if (page === 0) {
      return 'KeyIcon';
    }
    return 'PlusIcon';
  };

  return (
    <>
      <ModalAddressCreate
        isOpen={createAddressIsOpen}
        setIsOpen={setCreateAddressIsOpen}
      />
      <ModalCardCreate
        isOpen={createCardIsOpen}
        setIsOpen={setCreateCardIsOpen}
      />
      <ModalAddressUpdate />
      <ModalCustomerUpdate
        isOpen={updateCustomerIsOpen}
        setIsOpen={setUpdateCustomerIsOpen}
      />
      <ModalCustomerPasswordUpdate
        isOpen={updatePasswordIsOpen}
        setIsOpen={setUpdatePasswordIsOpen}
      />
      <StyledHeader>
        <TitleContainer>
          <BackButton />
          <Title>Detalhes de cliente: {customer?.name}</Title>
        </TitleContainer>
        <ActionsContainer>
          <TabsContainer>
            {['Dados pessoais', 'Endereços', 'Cartões'].map((label, index) => (
              <StyledTabs
                key={label}
                $active={page === index}
                onClick={() => handlePageChange(index)}
              >
                {label}
              </StyledTabs>
            ))}
          </TabsContainer>
          <ButtonComponent
            onClick={handleAddClick}
            icon={buttonIcon()}
            width="15rem"
          >
            {buttonContent()}
          </ButtonComponent>
        </ActionsContainer>
      </StyledHeader>
      <PageContainer>
        {page === 0 && (
          <CardPersonalData setUpdateIsOpen={setUpdateCustomerIsOpen} />
        )}
        {page === 1 &&
          customer?.addresses.map((address: IAddress) => (
            <CardAddress key={address.id} address={address} />
          ))}
        {page === 2 &&
          customer?.cards.map((card: ICard) => (
            <CardCard key={card.id} card={card} />
          ))}
      </PageContainer>
    </>
  );
};

export default CustomerDetails;
