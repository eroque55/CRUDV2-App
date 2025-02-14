import { StyledPage } from "@/src/app/customer/[id]/page.styles";
import AddressCard from "./AddressCard";
import { useAddressesStore } from "@/src/store/AddressStore";

export default function AddressesPage() {
   const { addresses } = useAddressesStore();
   return (
      <StyledPage>
         {addresses.map((address) => (
            <AddressCard key={address._id} address={address} />
         ))}
      </StyledPage>
   );
}
