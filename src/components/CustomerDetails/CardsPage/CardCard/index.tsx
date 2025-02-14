import { capitalizeFirstLetter } from "@/src/util";
import InfoContainer from "../../Common/InfoContainer";
import ICard from "@/src/@types/ICard";
import { toast } from "react-toastify";
import { SuccesToast } from "@/src/components/commom/Toastify/ToastContainer";
import { deleteCard } from "@/src/services/CardService";
import { StyledCard } from "../../Common/StyledCard/index.styles";
import { ButtonsContainer } from "@/src/components/commom/DetailsActionButtons/index.styles";
import ActionButtons from "@/src/components/commom/DetailsActionButtons/ActionButton";

interface Props {
   card: ICard;
   fetchData: () => void;
}

export default function CardCard({ card, fetchData }: Props) {
   async function handleDeleteCard() {
      try {
         await deleteCard(card._id);
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
         await fetchData();
      } catch (error) {
         alert("Erro ao excluir cartão: " + error);
      }
   }

   const cardBrand = capitalizeFirstLetter(card._cardBrand);
   const expirationDate =
      card._expirationDate.slice(0, 2) + "/" + card._expirationDate.slice(2);
   const preferential = card._preferential ? "Sim" : "Não";

   return (
      <StyledCard>
         <InfoContainer title="Número do cartão">{card._number}</InfoContainer>
         <ButtonsContainer>
            <ActionButtons
               onClick={handleDeleteCard}
               src="/icons/DeleteButton.svg"
               alt="Botão de excluir"
            />
         </ButtonsContainer>
         <InfoContainer title="Titular do cartão">
            {card._cardholder}
         </InfoContainer>
         <InfoContainer title="Validade">{expirationDate}</InfoContainer>
         <InfoContainer title="Bandeira do cartão">{cardBrand}</InfoContainer>
         <InfoContainer title="Preferencial">{preferential}</InfoContainer>
      </StyledCard>
   );
}
