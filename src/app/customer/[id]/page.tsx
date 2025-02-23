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
import { useEffect, useState } from "react";
import Loading from "@/src/components/Commom/Loading";
import ExitModal from "@/src/components/NavBar/ExitModal";
import { StyledTitle } from "@/src/components/Commom/Title";
import BackButton from "@/src/components/Commom/BackButton";
import AddressesPage from "@/src/components/CustomerDetails/AddressesPage";
import CardsPage from "@/src/components/CustomerDetails/CardsPage";
import PersonalDataPage from "@/src/components/CustomerDetails/PersonalDataPage";
import AddButton from "@/src/components/Commom/AddButton";

import {
   useCreateAddress,
   useCreateCard,
   useUpdatePassword,
} from "@/src/store/CustomerDetailsStore";
import CreateCard from "@/src/components/CustomerDetails/Modals/CreateCard";
import CreateAddress from "@/src/components/CustomerDetails/Modals/CreateAddress";
import { StyledToastContainer } from "@/src/components/Commom/Toastify/index.styles";
import UpdateAddressModal from "@/src/components/CustomerDetails/Modals/UpdateAddress";
import { useCustomerDetails } from "@/src/hooks/useCustomerDetails";
import UpdatePersonalDataModal from "@/src/components/CustomerDetails/Modals/UpdatePersonalData";
import ResetPasswordButton from "@/src/components/Commom/ResetPasswordButton";

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

   const phone = customer.phones?.[0] ?? null;

   return (
      <>
         <StyledToastContainer />
         <ExitModal />
         <CreateCard />
         <CreateAddress />
         <UpdateAddressModal />
         <UpdatePersonalDataModal />
         <StyledMain>
            <StyledBackgroud />
            <NavBar />
            <StyledContent>
               <StyledHeader>
                  <TitleContainer>
                     <BackButton href="/" />
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
                  <PersonalDataPage customer={customer} phone={phone} />
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
