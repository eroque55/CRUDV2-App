import Image from "next/image";
import { StyledLink, StyledText } from "./index.styles";

interface Props {
   children: React.ReactNode;
   href: string;
   icone: string;
   iconeAtivo?: string;
   ativo?: boolean;
   menuAtivo?: boolean;
}

export default function ItemNavegacao({
   children,
   href,
   icone,
   iconeAtivo = icone,
   ativo = false,
   menuAtivo = false,
}: Props) {
   return (
      <StyledLink href={href} $ativo={ativo}>
         <Image
            src={ativo ? iconeAtivo : icone}
            alt={`Icone de ${children}`}
            width={20}
            height={20}
         />
         {menuAtivo ? <StyledText>{children}</StyledText> : null}
      </StyledLink>
   );
}
