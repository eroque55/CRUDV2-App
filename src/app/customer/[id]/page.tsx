"use client";

import ICustomer from "@/src/@types/ICustomer";
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
import { getCustomer } from "@/src/services/CustomerService";
import Loading from "@/src/components/commom/Loading";
import ExitModal from "@/src/components/NavBar/ExitModal";
import { StyledTitle } from "@/src/components/commom/Title";
import BackButton from "@/src/components/commom/BackButton";
import AddressesPage from "@/src/components/CustomerDetails/AddressesPage";
import { getAddressesByCustomer } from "@/src/services/AddressService";
import { getPhoneByCustomer } from "@/src/services/PhoneService";
import CardsPage from "@/src/components/CustomerDetails/CardsPage";
import { getCardsByCustomer } from "@/src/services/CardService";
import PersonalDataPage from "@/src/components/CustomerDetails/PersonalDataPage";
import AddButton from "@/src/components/commom/AddButton";
import IPhone from "@/src/@types/IPhone";
import IAddress from "@/src/@types/IAddress";

import {
   useCreateAddress,
   useCreateCard,
} from "@/src/store/CustomerDetailsStore";
import CreateCard from "@/src/components/CustomerDetails/Modals/CreateCard";
import ICard from "@/src/@types/ICard";
import CreateAddress from "@/src/components/CustomerDetails/Modals/CreateAddress";
import { StyledToastContainer } from "@/src/components/commom/Toastify/ToastContainer/index.styles";
import UpdateAddressModal from "@/src/components/CustomerDetails/EditAddress";
import { useCustomerStore } from "@/src/store/CustomerStore";
import { useAddressesStore } from "@/src/store/AddressStore";
import { useCardStore } from "@/src/store/CardsStore";
import { usePhoneStore } from "@/src/store/PhoneStore";

export default function Customer() {
   const params = useParams();
   const id = params.id ? parseInt(params.id as string) : NaN;

   const { customer, getCustomer } = useCustomerStore();
   const { addresses, getAddressesByCustomer } = useAddressesStore();
   const { cards, getCardsByCustomer } = useCardStore();
   const { phone, getPhoneByCustomer } = usePhoneStore();

   const [loading, setLoading] = useState(true);
   const [page, setPage] = useState(0);

   const { openModal: openCreateAddress } = useCreateAddress();
   const { openModal: openCreateCard } = useCreateCard();

   async function fetchData() {
      try {
         await getCustomer(id);
         await getAddressesByCustomer(id);
         await getCardsByCustomer(id);
         await getPhoneByCustomer(id);
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

   function vazia() {}
   if (loading) return <Loading />;

   const handlePageChange = (newPage: number) => setPage(newPage);

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
                  <AddressesPage fetchData={vazia} addresses={addresses} />
               )}
               {page === 2 && <CardsPage />}
            </StyledContent>
         </StyledMain>
      </>
   );
}
