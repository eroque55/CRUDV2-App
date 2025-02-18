import { StyledCard } from "../../common/StyledCard/index.styles";
import InfoContainer from "../../../commom/InfoContainer";
import { capitalizeFirstLetter } from "@/src/util";
import { Phone } from "@/src/@types/api";

interface Props {
   phone: Phone | null;
}

export default function PhoneCard({ phone }: Props) {
   if (!phone) return null;
   const phoneFormatted = `(${phone.ddd}) ${phone.number.substring(
      0,
      5
   )}-${phone.number.substring(5)}`;
   return (
      <StyledCard>
         <InfoContainer title="Tipo de telefone">
            {capitalizeFirstLetter(phone.phoneType)}
         </InfoContainer>
         <InfoContainer title="Telefone">{phoneFormatted}</InfoContainer>
      </StyledCard>
   );
}
