import { StyledPage } from "@/src/app/customer/[id]/page.styles";
import IAddress from "@/src/@types/IAddress";
import AddressCard from "./AddressCard";

interface Props {
   addresses: IAddress[];
   fetchData: () => void;
}

export default function AddressesPage({ addresses, fetchData }: Props) {
   return (
      <StyledPage>
         {addresses.map((address) => (
            <AddressCard
               fetchData={fetchData}
               key={address._id}
               address={address}
            />
         ))}
      </StyledPage>
   );
}
