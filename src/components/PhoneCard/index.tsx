import { StyledCard } from "../StyledCard/index.styles";
import CardContent from "../CardContentContainer";
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
         <CardContent title="Tipo de telefone">
            {capitalizeFirstLetter(phone.phoneType)}
         </CardContent>
         <CardContent title="Telefone">{phoneFormatted}</CardContent>
      </StyledCard>
   );
}
