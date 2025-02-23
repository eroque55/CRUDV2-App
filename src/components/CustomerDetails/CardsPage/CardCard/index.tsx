import { capitalizeFirstLetter } from "@/src/util";
import InfoContainer from "@/src/components/Commom/InfoContainer";
import { toast } from "react-toastify";
import { deleteCard, updateCard } from "@/src/services/CardService";
import { ButtonsContainer } from "@/src/components/Commom/DetailsActionButtons/index.styles";
import ActionButtons from "@/src/components/Commom/DetailsActionButtons/ActionButton";
import { StyledCard } from "../../Common/StyledCard/index.styles";
import { useCustomerState } from "@/src/store/CustomerDetailsStore";
import { Card } from "@/src/@types/api";
import { ConfirmationToast } from "@/src/components/Commom/Toastify/ConfirmationToast";

interface Props {
   customerId: number;
   card: Card;
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
   const preferential = card.preferential ? "Sim" : "Não";

   return (
      <StyledCard $isPreferential={card.preferential}>
         <InfoContainer title="Número do cartão">{card.number}</InfoContainer>
         <ButtonsContainer>
            {!card.preferential && (
               <>
                  <ActionButtons
                     onClick={handleSetPreferential}
                     src="/icons/PreferentialButton.svg"
                     alt="Botão de preferencial"
                  />
                  <ActionButtons
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
                     src="/icons/DeleteButton.svg"
                     alt="Botão de excluir"
                  />
               </>
            )}
         </ButtonsContainer>
         <InfoContainer title="Titular do cartão">
            {card.cardholder}
         </InfoContainer>
         <InfoContainer title="Validade">{expirationDate}</InfoContainer>
         <InfoContainer title="Bandeira do cartão">{cardBrand}</InfoContainer>
         <InfoContainer title="Preferencial">{preferential}</InfoContainer>
      </StyledCard>
   );
}
