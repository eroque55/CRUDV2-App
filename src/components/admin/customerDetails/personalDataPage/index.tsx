import { StyledPage } from "@/src/app/admin/customer/[id]/page.styles";
import PersonalDataCard from "./personalDataCard";
import PhoneCard from "./phoneCard";
import { Customer, Phone } from "@/src/@types/api";

interface Props {
   customer: Customer | null;
   phone: Phone | null;
}

export default function PersonalDataPage({ customer, phone }: Props) {
   return (
      <StyledPage>
         <PersonalDataCard customer={customer} />
         <PhoneCard phone={phone} />
      </StyledPage>
   );
}
