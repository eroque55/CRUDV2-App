import { Address, City, State, Country } from "@/src/@types/api";
import { capitalizeFirstLetter } from "@/src/util";
import DetailsActionButtons from "@/src/components/commom/DetailsActionButtons";
import { SuccesToast } from "@/src/components/commom/Toastify/ToastContainer";
import { toast } from "react-toastify";
import { deleteAddress } from "@/src/services/AddressService";
import { StyledCard } from "@/src/components/CustomerDetails/common/StyledCard/index.styles";
import InfoContainer from "@/src/components/CustomerDetails/common/InfoContainer/";
import {
   useCustomerState,
   useUpdateAddress,
} from "@/src/store/CustomerDetailsStore";

interface Props {
   customerId: number;
   address: Address;
}

export default function AddressCard({ address, customerId }: Props) {
   const { getCustomer } = useCustomerState();
   const { openModal } = useUpdateAddress();

   async function handleDeleteAddress() {
      try {
         await deleteAddress(address.id || 0);
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
         await getCustomer(customerId);
      } catch (error) {
         alert("Erro ao excluir endereço: " + error);
      }
   }

   function handlUpdateAddress() {
      openModal(address);
   }
   const cep = address.cep.replace(/(\d{5})(\d{3})/, "$1-$2");
   const street = `${address.street}, ${address.number}`;
   const streetType = capitalizeFirstLetter(address.streetType);
   const addressType = capitalizeFirstLetter(address.addressType);
   const residenceType = capitalizeFirstLetter(address.residenceType);

   return (
      <StyledCard>
         <InfoContainer title="Tipo de endereço">{addressType}</InfoContainer>
         <DetailsActionButtons
            handleDelete={handleDeleteAddress}
            handleEdit={handlUpdateAddress}
         />
         <InfoContainer title="Apelido">{address.nickname}</InfoContainer>
         <InfoContainer title="CEP">{cep}</InfoContainer>
         <InfoContainer title="Tipo de residência">
            {residenceType}
         </InfoContainer>
         <InfoContainer title="Tipo de logradouro">{streetType}</InfoContainer>
         <InfoContainer title="Logradouro">{street}</InfoContainer>
         <InfoContainer title="Bairro">{address.neighborhood}</InfoContainer>
         <InfoContainer title="Cidade">{address.city.name}</InfoContainer>
         <InfoContainer title="Estado">{address.city.state.name}</InfoContainer>
         <InfoContainer title="Pais">
            {address.city.state.country.name}
         </InfoContainer>
         {address.complement && (
            <InfoContainer title="Complemento">
               {address.complement}
            </InfoContainer>
         )}
      </StyledCard>
   );
}
