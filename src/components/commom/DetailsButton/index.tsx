import Image from "next/image";
import { StyledLink } from "./index.styles";
import icon from "@/public/icons/detalhes.svg";

interface Props {
   href: string;
}

export default function DetailsButton({ href }: Props) {
   return (
      <StyledLink href={href}>
         <Image src={icon} width={20} height={30} alt="Icone" />
      </StyledLink>
   );
}
