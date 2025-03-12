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
import NavBar from "@/src/components/admin/navBar";
import { useParams } from "next/navigation";
import { useState } from "react";
import Loading from "@/src/components/admin/common/loading";
import ExitModal from "@/src/components/admin/navBar/exitModal";
import { StyledTitle } from "@/src/components/admin/common/title";
import BackButton from "@/src/components/admin/common/backButton";
import AddressesPage from "@/src/components/admin/customerDetails/addressesPage";
import CardsPage from "@/src/components/admin/customerDetails/cardsPage";
import PersonalDataPage from "@/src/components/admin/customerDetails/personalDataPage";
import AddButton from "@/src/components/admin/common/addButton";

import {
   useCreateAddress,
   useCreateCard,
   useUpdatePassword,
} from "@/src/store/CustomerDetailsStore";
import CreateCard from "@/src/components/admin/customerDetails/modals/createCard";
import CreateAddress from "@/src/components/admin/customerDetails/modals/createAddress";
import { StyledToastContainer } from "@/src/components/common/toastify/index.styles";
import UpdateAddressModal from "@/src/components/admin/customerDetails/modals/updateAddress";
import { useCustomerDetails } from "@/src/hooks/useCustomerDetails";
import UpdatePersonalDataModal from "@/src/components/admin/customerDetails/modals/updatePersonalData";
import ResetPasswordButton from "@/src/components/admin/common/resetPasswordButton";
import ResetPassword from "@/src/components/admin/customerDetails/modals/resetPassword";

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
         <ExitModal />
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
