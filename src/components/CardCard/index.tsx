import ICard from "@/src/interfaces/ICard";
import Card from "../Card";
import { capitalizeFirstLetter } from "@/src/utils";
import { CardContentProps } from "../CardContentContainer";
import { deleteCard, updateCard } from "@/src/services/Card.service";
import { confirmationModal, errorModal } from "@/src/utils/Toasts";
import { CardButtonProps } from "../CardButton";
import { getCustomer } from "@/src/services/Customer.service";
import { useParams } from "next/navigation";

interface Props {
   card: ICard;
}

const CardCard = ({ card }: Props) => {
   const params = useParams();
   const { refetch } = getCustomer(Number(params.id));

   async function handleDeleteCard() {
      try {
         await deleteCard(card.id);
         await refetch();
      } catch (error: any) {
         errorModal(error.response.data);
      }
   }

   async function handleSetPreferential() {
      try {
         await updateCard(card.id);
         await refetch();
      } catch (error: any) {
         errorModal(error.response.data);
      }
   }

   const expirationDate =
      card.expirationDate.slice(0, 2) + "/" + card.expirationDate.slice(2);

   const cardContent: CardContentProps[] = [
      {
         title: "Número do cartão",
         children: card.number,
      },
      {
         title: "Nome do titular",
         children: card.cardholder,
      },
      {
         title: "Validade",
         children: expirationDate,
      },
      {
         title: "Bandeira do cartão",
         children: capitalizeFirstLetter(card.cardBrand),
      },
   ];

   const preferentialButton: CardButtonProps = {
      icon: "CheckGreenIcon",
      onClick: handleSetPreferential,
   };

   const deleteButton: CardButtonProps = {
      icon: "TrashRedIcon",
      onClick: () =>
         confirmationModal({
            title: "Excluir cartão",
            message: "Deseja realmente excluir este cartão?",
            confirmButton: "Excluir",
            cancelButton: "Cancelar",
            confirmAction: handleDeleteCard,
            notice: "Essa ação não poderá ser desfeita.",
            successMessage: "Cartão excluído com sucesso!",
         }),
   };

   const cardButtons: CardButtonProps[] = [];
   if (!card.preferential) cardButtons.push(preferentialButton);
   cardButtons.push(deleteButton);

   return (
      <Card
         cardContent={cardContent}
         active={card.preferential}
         cardButtons={cardButtons}
      />
   );
};

export default CardCard;
