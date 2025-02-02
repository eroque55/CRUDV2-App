import Image from "next/image";

import NavBarItem from "@/src/components/NavBar/ItemNavegacao";
import logo from "@/public/images/logo.svg";
import logoX from "@/public/images/logoX.svg";
import { StyledMenuList, StyledNav } from "./index.styles";
import { useState } from "react";

export default function NavBar() {
   const [menuAtivo, setMenuAtivo] = useState(false);

   function toggleMenu(e: React.MouseEvent<HTMLDivElement>) {
      e.stopPropagation();
      setMenuAtivo(!menuAtivo);
      console.log("Menu ativo: ", menuAtivo);
   }

   return (
      <StyledNav onClick={toggleMenu}>
         <Image
            src={menuAtivo ? logo : logoX}
            alt="Logo"
            width={menuAtivo ? 114 : 38}
            height="36"
         />
         <StyledMenuList>
            <NavBarItem
               href="/"
               icone="icons/clientesInativo.svg"
               iconeAtivo="icons/clientesAtivo.svg"
               ativo
               menuAtivo={menuAtivo}
            >
               Lista de clientes
            </NavBarItem>
         </StyledMenuList>
         <NavBarItem href="/" icone="icons/sair.svg" menuAtivo={menuAtivo}>
            Sair
         </NavBarItem>
      </StyledNav>
   );
}
