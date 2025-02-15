import { capitalizeFirstLetter } from "@/src/util";
import InfoContainer from "@/src/components/CustomerDetails/common/InfoContainer/";
import ICard from "@/src/@types/ICard";
import { toast } from "react-toastify";
import { SuccesToast } from "@/src/components/commom/Toastify/ToastContainer";
import { deleteCard } from "@/src/services/CardService";
import { ButtonsContainer } from "@/src/components/commom/DetailsActionButtons/index.styles";
import ActionButtons from "@/src/components/commom/DetailsActionButtons/ActionButton";
import { StyledCard } from "../../common/StyledCard/index.styles";
import { useCardStore } from "@/src/store/CardsStore";

interface Props {
   card: ICard;
}

export default function CardCard({ card }: Props) {
   const { getCardsByCustomer } = useCardStore();

   async function handleDeleteCard() {
      try {
         await deleteCard(card.id);
         toast(SuccesToast, {
            data: {
               title: "Sucesso!",
               message: "Cartão excluido com sucesso!",
            },
            autoClose: false,
            position: "top-center",
            closeButton: false,
            hideProgressBar: true,
         });
         await getCardsByCustomer(card.customerId);
      } catch (error) {
         alert("Erro ao excluir cartão: " + error);
      }
   }

   const cardBrand = capitalizeFirstLetter(card.cardBrand);
   const expirationDate =
      card.expirationDate.slice(0, 2) + "/" + card.expirationDate.slice(2);
   const preferential = card.preferential ? "Sim" : "Não";

   return (
      <StyledCard>
         <InfoContainer title="Número do cartão">{card.number}</InfoContainer>
         <ButtonsContainer>
            <ActionButtons
               onClick={handleDeleteCard}
               src="/icons/DeleteButton.svg"
               alt="Botão de excluir"
            />
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
