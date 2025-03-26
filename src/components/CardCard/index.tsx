import { capitalizeFirstLetter } from "@/src/utils";
import InfoContainer from "@/src/components/InfoContainer";
import { toast } from "react-toastify";
import { deleteCard, updateCard } from "@/src/services/Card.service";
import {
   ButtonsContainer,
   StyledCard,
} from "@/src/components/StyledCard/index.styles";
import { useCustomerState } from "@/src/store/CustomerDetailsStore";
import ICard from "@/src/interfaces/ICard";
import { ConfirmationToast } from "@/src/components/ConfirmationToast";
import CardButton from "../CardButton";

interface Props {
   customerId: number;
   card: ICard;
}

export default function CardCard({ card, customerId }: Props) {
   const { getCustomer } = useCustomerState();

   async function handleDeleteCard() {
      try {
         await deleteCard(card.id);
         await getCustomer(customerId);
      } catch (error: any) {
         toast.error(error.response.data);
      }
   }

   async function handleSetPreferential() {
      try {
         await updateCard(card.id);
         await getCustomer(customerId);
      } catch (error: any) {
         toast.error(error.response.data);
      }
   }

   const cardBrand = capitalizeFirstLetter(card.cardBrand);
   const expirationDate =
      card.expirationDate.slice(0, 2) + "/" + card.expirationDate.slice(2);

   return (
      <StyledCard $isPreferential={card.preferential}>
         <InfoContainer title="Número do cartão">{card.number}</InfoContainer>
         <ButtonsContainer>
            {!card.preferential && (
               <>
                  <CardButton
                     onClick={handleSetPreferential}
                     icon="CheckGreenIcon"
                  />
                  <CardButton
                     onClick={() => {
                        toast(ConfirmationToast, {
                           data: {
                              title: "Tem certeza?",
                              message:
                                 "Tem certeza que deseja excluir esse cartão?",
                              notice: "Essa ação não poderá ser desfeita",
                              successMessage: "Cartão excluído com sucesso!",
                              actionButton: "Excluir",
                              onSubmit: handleDeleteCard,
                           },
                           autoClose: false,
                           position: "top-center",
                           closeButton: false,
                           hideProgressBar: true,
                        });
                     }}
                     icon="TrashIcon"
                  />
               </>
            )}
         </ButtonsContainer>
         <InfoContainer title="Titular do cartão">
            {card.cardholder}
         </InfoContainer>
         <InfoContainer title="Validade">{expirationDate}</InfoContainer>
         <InfoContainer title="Bandeira do cartão">{cardBrand}</InfoContainer>
      </StyledCard>
   );
}
