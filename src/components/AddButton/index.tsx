import { StyledAddButton } from "./index.styles";
import Image from "next/image";
import mais from "@/public/icons/mais.svg";

export default function AddButton({ onClick }: { onClick: () => void }) {
   return (
      <StyledAddButton onClick={onClick}>
         <Image src={mais} width={16} height={16} alt="Icone de mais" />
         Adicionar
      </StyledAddButton>
   );
}
