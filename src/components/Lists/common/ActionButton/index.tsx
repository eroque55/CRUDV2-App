import Image from "next/image";
import { StyledButton } from "./index.styles";

interface Props {
   onClick: () => void;
   icon: string;
}

export default function ActionButton({ onClick, icon }: Props) {
   return (
      <StyledButton onClick={onClick}>
         <Image src={icon} width={20} height={30} alt="Icone" />
      </StyledButton>
   );
}
