import { StyledMessage, StyledLink, UnloggedContent } from "./styles";
import IconComponent from "../Icon";

export default function Unlogged() {
   return (
      <UnloggedContent>
         <StyledMessage>
            Por favor, inicie a seção para utilizar o sistema
         </StyledMessage>
         <StyledLink href={"/"}>
            Voltar para a página inicial
            <IconComponent name="ExitBlueIcon" />
         </StyledLink>
      </UnloggedContent>
   );
}
