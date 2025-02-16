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
import Loading from "@/src/components/commom/Loading";
import ExitModal from "@/src/components/NavBar/ExitModal";
import { StyledTitle } from "@/src/components/commom/Title";
import BackButton from "@/src/components/commom/BackButton";
import AddressesPage from "@/src/components/CustomerDetails/AddressesPage";
import CardsPage from "@/src/components/CustomerDetails/CardsPage";
import PersonalDataPage from "@/src/components/CustomerDetails/PersonalDataPage";
import AddButton from "@/src/components/commom/AddButton";

import {
   useCreateAddress,
   useCreateCard,
   useCustomerState,
} from "@/src/store/CustomerDetailsStore";
import CreateCard from "@/src/components/CustomerDetails/Modals/CreateCard";
import CreateAddress from "@/src/components/CustomerDetails/Modals/CreateAddress";
import { StyledToastContainer } from "@/src/components/commom/Toastify/ToastContainer/index.styles";
import UpdateAddressModal from "@/src/components/CustomerDetails/Modals/EditAddress";

export default function CustomerDetails() {
   const params = useParams();
   const id = params.id ? parseInt(params.id as string) : NaN;

   const { customer, getCustomer } = useCustomerState();

   const [loading, setLoading] = useState(true);
   const [page, setPage] = useState(0);

   const { openModal: openCreateAddress } = useCreateAddress();
   const { openModal: openCreateCard } = useCreateCard();

   async function fetchData() {
      try {
         await getCustomer(id);
      } catch (error) {
         console.error("Erro ao buscar cliente:", error);
      } finally {
         setLoading(false);
      }
   }

   useEffect(() => {
      if (isNaN(id)) return;

      fetchData();
   }, [id]);

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
                     {page !== 0 && (
                        <AddButton
                           onClick={() =>
                              page === 1
                                 ? openCreateAddress(id)
                                 : openCreateCard(id)
                           }
                        />
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
