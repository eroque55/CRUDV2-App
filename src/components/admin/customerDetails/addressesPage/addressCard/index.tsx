import { Address } from "@/src/@types/api";
import { capitalizeFirstLetter } from "@/src/util";
import DetailsActionButtons from "@/src/components/admin/common/detailsActionButtons";
import { toast } from "react-toastify";
import { deleteAddress } from "@/src/services/AddressService";
import InfoContainer from "@/src/components/admin/common/infoContainer";
import {
   useCustomerState,
   useUpdateAddress,
} from "@/src/store/CustomerDetailsStore";
import { ConfirmationToast } from "@/src/components/common/toastify/confirmationToast";
import { StyledCard } from "@/src/components/admin/customerDetails/common/styledCard/index.styles";

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
         await getCustomer(customerId);
      } catch (error: any) {
         toast.error(error.response.data);
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
            handleDelete={() => {
               toast(ConfirmationToast, {
                  data: {
                     title: "Tem certeza?",
                     message: "Tem certeza que deseja excluir esse endereço?",
                     notice: "Essa ação não poderá ser desfeita",
                     successMessage: "Endereço excluído com sucesso!",
                     actionButton: "Excluir",
                     onSubmit: handleDeleteAddress,
                  },
                  autoClose: false,
                  position: "top-center",
                  closeButton: false,
                  hideProgressBar: true,
               });
            }}
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
