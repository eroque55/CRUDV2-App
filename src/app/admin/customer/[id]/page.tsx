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

import {
   useCreateAddress,
   useCreateCard,
   useUpdatePassword,
} from "@/src/store/CustomerDetailsStore";
import { useCustomerDetails } from "@/src/hooks/useCustomerDetails";
import ButtonComponent from "@/src/components/Button";
import PersonalDataCard from "@/src/components/PersonalDataCard";
import PhoneCard from "@/src/components/PhoneCard";
import AddressCard from "@/src/components/AddressCard";
import IAddress from "@/src/interfaces/IAddress";
import ICard from "@/src/interfaces/ICard";
import CardCard from "@/src/components/CardCard";
export default function CustomerDetails() {
   const params = useParams();
   const id = params.id ? parseInt(params.id as string) : NaN;
   const { customer, loading } = useCustomerDetails(id);
   const [page, setPage] = useState(0);

   const { openModal: openCreateAddress } = useCreateAddress();
   const { openModal: openCreateCard } = useCreateCard();
   const { openModal: openUpdatePassword } = useUpdatePassword();

   if (loading || !customer) return <Loading />;

   const handlePageChange = (newPage: number) => setPage(newPage);

   const handleAddClick = () => {
      if (page === 0) openUpdatePassword(id);
      if (page === 1) openCreateAddress(id);
      if (page === 2) openCreateCard(id);
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
            {page === 0 && (
               <>
                  <PersonalDataCard customer={customer} />
                  <PhoneCard phone={customer.phone} />
               </>
            )}
            {page === 1 &&
               customer.addresses.map((address: IAddress) => (
                  <AddressCard
                     customerId={customer.id}
                     key={address.id}
                     address={address}
                  />
               ))}
            {page === 2 &&
               customer.cards.map((card: ICard) => (
                  <CardCard
                     customerId={customer.id}
                     key={card.id}
                     card={card}
                  />
               ))}
         </PageContainer>
      </>
   );
}
