"use client";

import {
   StyledContent,
   StyledMain,
   StyledBackgroud,
   TitleContainer,
   StyledHeader,
   StyledTabs,
   TabsContainer,
   StyledActions,
} from "./page.styles";
import NavBar from "@/src/components/NavBar";
import { useParams } from "next/navigation";
import { useState } from "react";
import Loading from "@/src/components/Loading";
import { StyledTitle } from "@/src/components/Title";
import BackButton from "@/src/components/BackButton";
import AddressesPage from "@/src/components/AddressesPage";
import CardsPage from "@/src/components/CardsPage";
import PersonalDataPage from "@/src/components/PersonalDataPage";
import AddButton from "@/src/components/AddButton";

import {
   useCreateAddress,
   useCreateCard,
   useUpdatePassword,
} from "@/src/store/CustomerDetailsStore";
import CreateCard from "@/src/components/CreateCard";
import CreateAddress from "@/src/components/CreateAddress";
import { StyledToastContainer } from "@/src/components/Toastify/index.styles";
import UpdateAddressModal from "@/src/components/UpdateAddress";
import { useCustomerDetails } from "@/src/hooks/useCustomerDetails";
import UpdatePersonalDataModal from "@/src/components/UpdatePersonalData";
import ResetPasswordButton from "@/src/components/ResetPasswordButton";
import ResetPassword from "@/src/components/ResetPassword";

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

   return (
      <>
         <StyledToastContainer />
         <CreateCard />
         <CreateAddress />
         <ResetPassword />
         <UpdateAddressModal />
         <UpdatePersonalDataModal />
         <StyledMain>
            <StyledBackgroud />
            <NavBar />
            <StyledContent>
               <StyledHeader>
                  <TitleContainer>
                     <BackButton href="/admin" />
                     <StyledTitle>
                        Detalhes de cliente - id:{customer?.id}
                     </StyledTitle>
                  </TitleContainer>
                  <StyledActions>
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
                     {page === 0 && (
                        <ResetPasswordButton
                           onClick={() => openUpdatePassword(id)}
                        />
                     )}
                     {page === 1 && (
                        <AddButton onClick={() => openCreateAddress(id)} />
                     )}
                     {page === 2 && (
                        <AddButton onClick={() => openCreateCard(id)} />
                     )}
                  </StyledActions>
               </StyledHeader>

               {page === 0 && (
                  <PersonalDataPage
                     customer={customer}
                     phone={customer.phone}
                  />
               )}
               {page === 1 && (
                  <AddressesPage
                     customerId={id}
                     addresses={customer.addresses || []}
                  />
               )}
               {page === 2 && (
                  <CardsPage customerId={id} cards={customer.cards || []} />
               )}
            </StyledContent>
         </StyledMain>
      </>
   );
}
