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
import { getCardByCustomer } from "@/src/services/CardService";
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

export default function Customer() {
   const params = useParams();
   const id = params.id ? parseInt(params.id as string) : NaN;

   const [customer, setCustomer] = useState<ICustomer | null>(null);
   const [phone, setPhone] = useState<IPhone | null>(null);
   const [addresses, setAddresses] = useState<IAddress[]>([]);
   const [cards, setCards] = useState<ICard[]>([]);

   const [loading, setLoading] = useState(true);
   const [page, setPage] = useState(0);

   const { openModal: openCreateAddress } = useCreateAddress();
   const { openModal: openCreateCard } = useCreateCard();

   async function fetchData() {
      try {
         const [customerData, phoneData, addressesData, cardsData] =
            await Promise.all([
               getCustomer(id),
               getPhoneByCustomer(id),
               getAddressesByCustomer(id),
               getCardByCustomer(id),
            ]);

         setCustomer(customerData);
         setPhone(phoneData);
         setAddresses(addressesData);
         setCards(cardsData);
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

   if (loading) return <Loading />;

   const handlePageChange = (newPage: number) => setPage(newPage);

   return (
      <>
         <StyledToastContainer />
         <ExitModal />
         <CreateCard fetchData={fetchData} />
         <CreateAddress fetchData={fetchData} />
         <StyledMain>
            <StyledBackgroud />
            <NavBar />
            <StyledContent>
               <StyledHeader>
                  <TitleContainer>
                     <BackButton href="/" />
                     <StyledTitle>
                        Detalhes de cliente - id:{customer?._id}
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
               {page === 1 && <AddressesPage addresses={addresses} />}
               {page === 2 && <CardsPage cards={cards} />}
            </StyledContent>
         </StyledMain>
      </>
   );
}
