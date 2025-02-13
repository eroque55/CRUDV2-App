import Image from "next/image";
import { StyledActionButton } from "./index.styles";

interface Props {
   onClick: () => void;
}

export default function DeleteButton({ onClick }: Props) {
   return (
      <StyledActionButton onClick={onClick}>
         <Image
            alt="Botão de deleta"
            src={"/icons/DeleteButton.svg"}
            width={18}
            height={18}
         />
      </StyledActionButton>
   );
}
