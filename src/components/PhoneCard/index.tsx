import { StyledCard } from "../StyledCard/index.styles";
import InfoContainer from "../InfoContainer";
import { capitalizeFirstLetter } from "@/src/utils";
import IPhone from "@/src/interfaces/IPhone";

interface Props {
   phone: IPhone | null;
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
