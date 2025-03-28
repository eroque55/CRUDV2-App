"use client";

import {
   StyledHeader,
   StyledTabs,
   TabsContainer,
   ActionsContainer,
   PageContainer,
} from "./styles";
import { useParams } from "next/navigation";
import { useState } from "react";
import Loading from "@/src/components/Loading";
import { Title, TitleContainer } from "@/src/components/Title";
import BackButton from "@/src/components/BackButton";

import { useUpdatePassword } from "@/src/store/CustomerDetailsStore";
import { useCustomerDetails } from "@/src/hooks/useCustomerDetails";
import ButtonComponent from "@/src/components/Button";
import IAddress from "@/src/interfaces/IAddress";
import ICard from "@/src/interfaces/ICard";
import CardCard from "@/src/components/CardCard";
import CardAddress from "@/src/components/CardAddress";
import CardPersonalData from "@/src/components/CardPersonalData";
import ModalAddressCreate from "@/src/components/ModalAddressCreate";
import ModalCardCreate from "@/src/components/ModalCardCreate";
import ModalAddressUpdate from "@/src/components/ModalAddressUpdate";

const CustomerDetails = () => {
   const params = useParams();
   const id = params.id ? parseInt(params.id as string) : NaN;
   const { customer, loading } = useCustomerDetails(id);
   const [page, setPage] = useState(0);
   const [createAddressIsOpen, setCreateAddressIsOpen] = useState(false);
   const [updateAddressIsOpen, setUpdateAddressIsOpen] = useState(false);
   const [createCardIsOpen, setCreateCardIsOpen] = useState(false);

   const { openModal: openUpdatePassword } = useUpdatePassword();

   if (loading || !customer) return <Loading />;

   const handlePageChange = (newPage: number) => setPage(newPage);

   const handleAddClick = () => {
      if (page === 0) openUpdatePassword(id);
      if (page === 1) setCreateAddressIsOpen(true);
      if (page === 2) setCreateCardIsOpen(true);
   };

   const buttonContent = () => {
      if (page === 0) return "Alterar senha";
      if (page === 1) return "Adicionar endereço";
      if (page === 2) return "Adicionar cartão";
   };

   const buttonIcon = () => {
      if (page === 0) return "KeyIcon";
      return "PlusIcon";
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
         <StyledHeader>
            <TitleContainer>
               <BackButton />
               <Title>Detalhes de cliente: {customer?.name}</Title>
            </TitleContainer>
            <ActionsContainer>
               <TabsContainer>
                  {["Dados pessoais", "Endereços", "Cartões"].map(
                     (label, index) => (
                        <StyledTabs
                           key={index}
                           $active={page === index}
                           onClick={() => handlePageChange(index)}
                        >
                           {label}
                        </StyledTabs>
                     )
                  )}
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
            {page === 0 && <CardPersonalData customer={customer} />}
            {page === 1 &&
               customer.addresses.map((address: IAddress) => (
                  <CardAddress key={address.id} address={address} />
               ))}
            {page === 2 &&
               customer.cards.map((card: ICard) => (
                  <CardCard key={card.id} card={card} />
               ))}
         </PageContainer>
      </>
   );
};

export default CustomerDetails;
