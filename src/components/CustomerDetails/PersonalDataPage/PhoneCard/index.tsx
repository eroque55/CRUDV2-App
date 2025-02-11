import IPhone from "@/src/@types/IPhone";
import { StyledCard } from "../../common/StyledCard/index.styles";
import InfoContainer from "../../common/InfoContainer";
import { capitalizeFirstLetter } from "@/src/util";

interface Props {
   phone: IPhone | null;
}

export default function PhoneCard({ phone }: Props) {
   if (!phone) return null;
   const phoneFormatted = `(${phone._ddd}) ${phone._number.substring(
      0,
      5
   )}-${phone._number.substring(5)}`;
   return (
      <StyledCard>
         <InfoContainer title="Tipo de telefone">
            {capitalizeFirstLetter(phone._phoneType)}
         </InfoContainer>
         <InfoContainer title="Telefone">{phoneFormatted}</InfoContainer>
      </StyledCard>
   );
}
