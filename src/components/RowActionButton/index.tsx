import Image from "next/image";
import { StyledButton } from "./index.styles";

interface Props {
   icon: string;
   id: number;
   onClick: (id: number) => void;
}

export default function ActionButton({ onClick, icon, id }: Props) {
   return (
      <StyledButton
         onClick={(e) => {
            e.stopPropagation();
            onClick(id);
         }}
      >
         <Image src={icon} width={20} height={30} alt="Icone" />
      </StyledButton>
   );
}
