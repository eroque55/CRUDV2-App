import Image from "next/image";
import { StyledBackButton } from "./index.styles";

interface Props {
   href: string;
}

export default function BackButton({ href }: Props) {
   return (
      <StyledBackButton href={href}>
         <Image
            src="/icons/back-button.svg"
            alt="icone de voltar"
            height={24}
            width={12}
         />
      </StyledBackButton>
   );
}
