import Image from "next/image";
import { StyledFilterButton } from "./index.styles";
import FilterIcon from "@/public/icons/FilterIcon.svg";

interface Props {
   onClick: () => void;
}

export default function FilterButton({ onClick }: Props) {
   return (
      <StyledFilterButton onClick={onClick}>
         <Image src={FilterIcon} alt="Icone de filtro" width={16} height={16} />
         Filtrar
      </StyledFilterButton>
   );
}
