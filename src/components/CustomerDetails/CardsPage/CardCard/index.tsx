import { capitalizeFirstLetter } from "@/src/util";
import InfoContainer from "../../common/InfoContainer";
import { StyledCard } from "../../common/StyledCard/index.styles";
import DeleteButton from "@/src/components/commom/DeleteButton";
import ICard from "@/src/@types/ICard";

interface Props {
   card: ICard;
}

function deleteCard() {}

export default function CardCard({ card }: Props) {
   const cardBrand = capitalizeFirstLetter(card._cardBrand);
   const expirationDate =
      card._expirationDate.slice(0, 2) + "/" + card._expirationDate.slice(2);
   const preferential = card._preferential ? "Sim" : "Não";
   return (
      <StyledCard>
         <DeleteButton onClick={deleteCard} />
         <InfoContainer title="Número do cartão">{card._number}</InfoContainer>
         <InfoContainer title="Titular do cartão">
            {card._cardholder}
         </InfoContainer>
         <InfoContainer title="Validade">{expirationDate}</InfoContainer>
         <InfoContainer title="Bandeira do cartão">{cardBrand}</InfoContainer>
         <InfoContainer title="Preferencial">{preferential}</InfoContainer>
      </StyledCard>
   );
}
