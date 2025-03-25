import Image from "next/image";
import { StyledMessage, StyledLink, UnloggedContent } from "./index.styles";
import ExitIcon from "@/public/icons/exit-icon.svg";

export default function Unlogged() {
   return (
      <UnloggedContent>
         <StyledMessage>
            Por favor, inicie a seção para utilizar o sistema
         </StyledMessage>
         <StyledLink href={"/"}>
            Voltar para a página inicial
            <Image src={ExitIcon} alt="Icone de sair" />
         </StyledLink>
      </UnloggedContent>
   );
}
