import Image from "next/image";
import { StyledFilterButton } from "./index.styles";
import FilterIcon from "@/public/icons/FilterIcon.svg";

export default function FilterButton() {
   return (
      <StyledFilterButton>
         <Image src={FilterIcon} alt="Icone de filtro" width={16} height={16} />
         Filtrar
      </StyledFilterButton>
   );
}
