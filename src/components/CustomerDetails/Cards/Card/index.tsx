import InfoContainer from "../../Common/InfoContainer";
import { StyledContainer } from "../../Common/InfoContainer/index.styles";
import ICard from "@/src/@types/ICard";

interface Props {
   card: ICard;
}

export default function CardCard({ card }: Props) {
   return (
      <StyledContainer>
         <InfoContainer title="Número do cartão">{card._number}</InfoContainer>
         <InfoContainer title="Titular do cartão">
            {card._cardholder}
         </InfoContainer>
         <InfoContainer title="Validade">{card._expirationDate}</InfoContainer>
         <InfoContainer title="Bandeira do cartão">
            {card._cardBrand}
         </InfoContainer>
         <InfoContainer title="Preferential">
            {card._preferential}
         </InfoContainer>
      </StyledContainer>
   );
}
