import Card from "../Card";
import { capitalizeFirstLetter, formatCep } from "@/src/utils";
import { CardContentProps } from "../CardContentContainer";
import { confirmationModal, errorModal } from "@/src/utils/Toasts";
import { CardButtonProps } from "../CardButton";
import IAddress from "@/src/interfaces/IAddress";
import { deleteAddress } from "@/src/services/Address.service";
import { useUpdateAddress } from "@/src/store/AddressUpdateStore";
import { getCustomer } from "@/src/services/Customer.service";
import { useParams } from "next/navigation";

interface Props {
   address: IAddress;
}

const CardAddress = ({ address }: Props) => {
   const params = useParams();
   const { refetch } = getCustomer(Number(params.id));
   const { openModal } = useUpdateAddress();

   async function handleDelete() {
      try {
         await deleteAddress(address.id || 0);
         await refetch();
      } catch (error: any) {
         errorModal(error.response.data);
      }
   }

   function handlUpdate() {
      openModal(address);
   }

   const cardContent: CardContentProps[] = [
      {
         title: "Tipo do endereço",
         children: capitalizeFirstLetter(address.addressType),
      },
      {
         title: "Apelido",
         children: address.nickname,
      },
      {
         title: "CEP",
         children: formatCep(address.cep),
      },
      {
         title: "Tipo de residência",
         children: capitalizeFirstLetter(address.residenceType),
      },
      {
         title: "Tipo de logradouro",
         children: capitalizeFirstLetter(address.streetType),
      },
      {
         title: "Logradouro",
         children: address.street,
      },
      {
         title: "Número",
         children: address.number,
      },
      {
         title: "Bairro",
         children: address.neighborhood,
      },
      {
         title: "Cidade",
         children: address.city.name,
      },
      {
         title: "Estado",
         children: address.city.state.name,
      },
      {
         title: "Pais",
         children: address.city.state.country.name,
      },
   ];

   const complement = {
      title: "Complemento",
      children: address.complement,
   };

   address.complement && cardContent.push(complement);

   const updateButton: CardButtonProps = {
      icon: "EditIcon",
      onClick: handlUpdate,
   };

   const deleteButton: CardButtonProps = {
      icon: "TrashRedIcon",
      onClick: () =>
         confirmationModal({
            title: "Deletar endereço",
            message: "Tem certeza que deseja deletar esse endereço?",
            notice: "Essa ação não poderá ser desfeita.",
            confirmButton: "Deletar",
            cancelButton: "Cancelar",
            confirmAction: handleDelete,
            successMessage: "Endereço deletado com sucesso!",
         }),
   };

   return (
      <Card
         cardContent={cardContent}
         cardButtons={[updateButton, deleteButton]}
      />
   );
};

export default CardAddress;
