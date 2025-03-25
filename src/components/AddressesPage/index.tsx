import { StyledPage } from "@/src/app/admin/customer/[id]/page.styles";
import AddressCard from "../AddressCard";
import { Address } from "@/src/interfaces/api";

interface Props {
   customerId: number;
   addresses: Address[];
}

export default function AddressesPage({ addresses, customerId }: Props) {
   return (
      <StyledPage>
         {addresses.map((address) => (
            <AddressCard
               customerId={customerId}
               key={address.id}
               address={address}
            />
         ))}
      </StyledPage>
   );
}
