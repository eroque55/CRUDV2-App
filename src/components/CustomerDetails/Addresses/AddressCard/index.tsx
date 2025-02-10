import IAddress from "@/src/@types/IAddress";
import InfoContainer from "../../Common/InfoContainer";
import { StyledContainer } from "../../Common/InfoContainer/index.styles";

interface Props {
   address: IAddress;
}

export default function AddressCard({ address }: Props) {
   return (
      <StyledContainer>
         <InfoContainer title="Apelido">{address._nickname}</InfoContainer>
      </StyledContainer>
   );
}
