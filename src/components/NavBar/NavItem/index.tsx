import Image from "next/image";
import { StyledLink, StyledText } from "./index.styles";
import { useNavBarStore } from "@/src/store/NavBarStore";

interface Props {
   children: React.ReactNode;
   href: string;
   icone: string;
   iconeAtivo?: string;
   ativo?: boolean;
}

export default function NavBarItem({
   children,
   href,
   icone,
   iconeAtivo = icone,
   ativo = false,
}: Props) {
   const { navBarIsOpen } = useNavBarStore();

   return (
      <StyledLink href={href} $ativo={ativo}>
         <Image
            src={ativo ? iconeAtivo : icone}
            alt={`Icone de ${children}`}
            width={20}
            height={20}
         />
         {navBarIsOpen && <StyledText>{children}</StyledText>}
      </StyledLink>
   );
}
