import { StyledPage } from "@/src/app/customer/[id]/page.styles";
import ICustomer from "@/src/@types/ICustomer";
import IPhone from "@/src/@types/IPhone";
import PersonalDataCard from "./PersonalDataCard";
import PhoneCard from "./PhoneCard";

interface Props {
   customer: ICustomer | null;
   phone: IPhone | null;
}

export default function PersonalDataPage({ customer, phone }: Props) {
   return (
      <StyledPage>
         <PersonalDataCard customer={customer} />
         <PhoneCard phone={phone} />
      </StyledPage>
   );
}
