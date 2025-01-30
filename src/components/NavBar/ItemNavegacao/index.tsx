import styled from "styled-components";

import Image from "next/image";
import Link from "next/link";

interface StyledLinkProps {
   $ativo: boolean;
}

const StyledLink = styled(Link)<StyledLinkProps>`
   background-color: ${(props) =>
      props.$ativo ? props.theme.colors.principal.cor3 : ""};
   color: ${(props) =>
      props.$ativo
         ? props.theme.colors.neutros.cor
         : props.theme.colors.neutros.cor6};
   display: flex;
   padding: 0.75rem;
   gap: 0.5rem;
   border-radius: 0.5rem;
   min-width: 100%;

   &:hover {
      background-color: ${(props) =>
         props.$ativo ? "" : "rgba(0, 0, 0, 0.05)"};
   }
`;

const Texto = styled.p`
   font-size: 1rem;
   font-weight: 400;
`;

interface Props {
   children: React.ReactNode;
   href: string;
   icone: string;
   iconeAtivo?: string;
   ativo?: boolean;
}

const ItemNavegacao = ({
   children,
   href,
   icone,
   iconeAtivo = icone,
   ativo = false,
}: Props) => {
   return (
      <StyledLink href={href} $ativo={ativo}>
         <Image
            src={ativo ? iconeAtivo : icone}
            alt={`Icone de ${children}`}
            width={20}
            height={20}
         />
         <Texto>{children}</Texto>
      </StyledLink>
   );
};

export default ItemNavegacao;
