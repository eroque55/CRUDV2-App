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
} from "./page.styles";
import NavBar from "@/src/components/NavBar";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getCustomer } from "@/src/services/CustomerService";
import Loading from "@/src/components/Loading";
import ExitModal from "@/src/components/NavBar/ExitModal";
import { StyledTitle } from "@/src/components/Title";
import BackButton from "@/src/components/BackButton";
import PersonalData from "@/src/components/CustomerDetails/PersonalData";
import AddressesPage from "@/src/components/CustomerDetails/Addresses";
import IAddress from "@/src/@types/IAddress";
import {
   getAddresses,
   getAddressesByCustomer,
} from "@/src/services/AddressService";

export default function Customer() {
   const params = useParams();
   const id = params.id ? parseInt(params.id as string) : NaN;

   const [customer, setCustomer] = useState<ICustomer>({
      _id: 0,
      _name: "",
      _cpf: "",
      _email: "",
      _birthDate: new Date(),
      _confPassword: "",
      _password: "",
      _gender: "OUTRO",
      _ranking: 0,
      _status: false,
   });

   const [addresses, setAddresses] = useState<IAddress[]>([]);

   const [loading, setLoading] = useState(true);
   const [page, setPage] = useState(0);

   useEffect(() => {
      async function fetchData() {
         try {
            const customerData = await getCustomer(id);
            const addressesData = await getAddressesByCustomer(id);
            setCustomer(customerData);
            setAddresses(addressesData);
         } catch (error) {
            console.error("Erro ao buscar cliente:", error);
         } finally {
            setLoading(false);
         }
      }

      if (!isNaN(id)) {
         fetchData();
      }
   }, [id]);

   if (loading) return <Loading />;

   return (
      <>
         <ExitModal />
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
                  <TabsContainer>
                     <StyledTabs
                        $active={page === 0}
                        onClick={(e) => {
                           e.preventDefault();
                           setPage(0);
                        }}
                     >
                        Dados pessoais
                     </StyledTabs>
                     <StyledTabs
                        onClick={(e) => {
                           setPage(1);
                        }}
                        $active={page === 1}
                     >
                        Endereços
                     </StyledTabs>
                     <StyledTabs
                        onClick={(e) => {
                           setPage(1);
                        }}
                        $active={page === 2}
                     >
                        Cartões
                     </StyledTabs>
                  </TabsContainer>
               </StyledHeader>

               {page === 0 && <PersonalData customer={customer} />}
               {page === 1 && <AddressesPage addresses={addresses} />}
            </StyledContent>
         </StyledMain>
      </>
   );
}
