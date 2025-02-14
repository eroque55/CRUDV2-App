import IAddress from "@/src/@types/IAddress";
import { useEffect, useState } from "react";
import { getCity } from "@/src/services/CityService";
import { getState } from "@/src/services/StateService";
import ICity from "@/src/@types/ICity";
import IState from "@/src/@types/IState";
import ICountry from "@/src/@types/ICountry";
import { capitalizeFirstLetter } from "@/src/util";
import { getCountry } from "@/src/services/ContryService";
import DetailsActionButtons from "@/src/components/commom/DetailsActionButtons";
import { SuccesToast } from "@/src/components/commom/Toastify/ToastContainer";
import { toast } from "react-toastify";
import { deleteAddress } from "@/src/services/AddressService";
import { StyledCard } from "@/src/components/CustomerDetails/common/StyledCard/index.styles";
import InfoContainer from "@/src/components/CustomerDetails/common/InfoContainer/";
import { useUpdateAddress } from "@/src/store/CustomerDetailsStore";
import { useAddressesStore } from "@/src/store/AddressStore";

interface Props {
   address: IAddress;
}

export default function AddressCard({ address }: Props) {
   const { getAddressesByCustomer } = useAddressesStore();
   const { openModal } = useUpdateAddress();
   const [city, setCity] = useState<ICity>();
   const [state, setState] = useState<IState>();
   const [country, setCountry] = useState<ICountry>();

   useEffect(() => {
      async function fetchData() {
         try {
            const cityData = await getCity(address._cityId);
            const stateData = await getState(cityData._stateId);
            const countryData = await getCountry(stateData._countryId);
            setCity(cityData);
            setState(stateData);
            setCountry(countryData);
         } catch (error) {
            console.error("Erro ao buscar cidade, estado ou pais:", error);
         }
      }
      fetchData();
   }, []);

   async function handleDeleteAddress() {
      try {
         await deleteAddress(address._id);
         toast(SuccesToast, {
            data: {
               title: "Sucesso!",
               message: "Endereço excluido com sucesso!",
            },
            autoClose: false,
            position: "top-center",
            closeButton: false,
            hideProgressBar: true,
         });
         await getAddressesByCustomer(address._customerId);
      } catch (error) {
         alert("Erro ao excluir endereço: " + error);
      }
   }

   function handlUpdateAddress() {
      openModal(address);
   }
   const cep = address._cep.replace(/(\d{5})(\d{3})/, "$1-$2");
   const street = `${address._street}, ${address._number}`;
   const streetType = capitalizeFirstLetter(address._streetType);
   const addressType = capitalizeFirstLetter(address._addressType);
   const residenceType = capitalizeFirstLetter(address._residenceType);

   return (
      <StyledCard>
         <InfoContainer title="Tipo de endereço">{addressType}</InfoContainer>
         <DetailsActionButtons
            handleDelete={handleDeleteAddress}
            handleEdit={handlUpdateAddress}
         />
         <InfoContainer title="Apelido">{address._nickname}</InfoContainer>
         <InfoContainer title="CEP">{cep}</InfoContainer>
         <InfoContainer title="Tipo de residência">
            {residenceType}
         </InfoContainer>
         <InfoContainer title="Tipo de logradouro">{streetType}</InfoContainer>
         <InfoContainer title="Logradouro">{street}</InfoContainer>
         <InfoContainer title="Bairro">{address._neighborhood}</InfoContainer>
         <InfoContainer title="Cidade">{city?._name}</InfoContainer>
         <InfoContainer title="Estado">{state?._name}</InfoContainer>
         <InfoContainer title="Pais">{country?._name}</InfoContainer>
         {address._complement && (
            <InfoContainer title="Complemento">
               {address._complement}
            </InfoContainer>
         )}
      </StyledCard>
   );
}
