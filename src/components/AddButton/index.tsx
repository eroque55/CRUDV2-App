import { StyledAddButton } from "./index.styles";
import Image from "next/image";
import mais from "@/public/icons/mais.svg";

export default function AddButton() {
   return (
      <StyledAddButton>
         <Image src={mais} width={16} height={16} alt="Icone de mais" />
         Adicionar
      </StyledAddButton>
   );
}
