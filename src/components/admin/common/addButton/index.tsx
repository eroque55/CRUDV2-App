import { StyledAddButton } from "./index.styles";
import Image from "next/image";
import plus from "@/public/icons/plus.svg";

export default function AddButton({ onClick }: { onClick: () => void }) {
   return (
      <StyledAddButton onClick={onClick}>
         <Image src={plus} width={16} height={16} alt="Icone de mais" />
         Adicionar
      </StyledAddButton>
   );
}
