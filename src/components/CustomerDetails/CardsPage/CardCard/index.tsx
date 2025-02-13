import { capitalizeFirstLetter } from "@/src/util";
import InfoContainer from "../../common/InfoContainer";
import { StyledCard } from "../../common/StyledCard/index.styles";
import ICard from "@/src/@types/ICard";
import DetailsActionButtons from "@/src/components/commom/DetailsActionButtons";
import { toast } from "react-toastify";
import { SuccesToast } from "@/src/components/commom/Toastify/ToastContainer";

interface Props {
   card: ICard;
}

function deleteCard() {
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
}

function editCard() {}

export default function CardCard({ card }: Props) {
   const cardBrand = capitalizeFirstLetter(card._cardBrand);
   const expirationDate =
      card._expirationDate.slice(0, 2) + "/" + card._expirationDate.slice(2);
   const preferential = card._preferential ? "Sim" : "Não";
   return (
      <StyledCard>
         <InfoContainer title="Número do cartão">{card._number}</InfoContainer>
         <DetailsActionButtons
            handleDelete={deleteCard}
            handleEdit={editCard}
         />
         <InfoContainer title="Titular do cartão">
            {card._cardholder}
         </InfoContainer>
         <InfoContainer title="Validade">{expirationDate}</InfoContainer>
         <InfoContainer title="Bandeira do cartão">{cardBrand}</InfoContainer>
         <InfoContainer title="Preferencial">{preferential}</InfoContainer>
      </StyledCard>
   );
}
