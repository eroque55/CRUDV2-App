import IAddress from "@/src/@types/IAddress";
import InfoContainer from "../../Common/InfoContainer";
import { StyledContainer } from "../../Common/InfoContainer/index.styles";
import { useEffect, useState } from "react";
import { getCity } from "@/src/services/CityService";
import { getState } from "@/src/services/StateService";
import ICity from "@/src/@types/ICity";
import IState from "@/src/@types/IState";
import ICountry from "@/src/@types/ICountry";
import { capitalizeFirstLetter } from "@/src/app/util";
import { getCountry } from "@/src/services/ContryService";

interface Props {
   address: IAddress;
}

export default function AddressCard({ address }: Props) {
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

   const cep = address._cep.replace(/(\d{5})(\d{3})/, "$1-$2");
   const street = `${address._street}, ${address._number}`;
   const streetType = capitalizeFirstLetter(address._streetType);
   const addressType = capitalizeFirstLetter(address._addressType);
   const residenceType = capitalizeFirstLetter(address._residenceType);

   return (
      <StyledContainer>
         <InfoContainer title="Tipo de endereço">{addressType}</InfoContainer>
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
      </StyledContainer>
   );
}
