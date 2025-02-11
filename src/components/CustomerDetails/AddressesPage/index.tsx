import { StyledPage } from "@/src/app/customer/[id]/page.styles";
import IAddress from "@/src/@types/IAddress";
import AddressCard from "./AddressCard";

interface Props {
   addresses: IAddress[];
}

export default function AddressesPage({ addresses }: Props) {
   return (
      <StyledPage>
         {addresses.map((address) => (
            <AddressCard key={address._id} address={address} />
         ))}
      </StyledPage>
   );
}
