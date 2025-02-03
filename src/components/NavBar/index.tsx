import Image from "next/image";

import NavBarItem from "@/src/components/NavBar/NavItem";
import logo from "@/public/images/logo.svg";
import logoX from "@/public/images/logoX.svg";
import { StyledMenuList, StyledNav } from "./index.styles";
import ExitItem from "./ExitItem";
import { useNavBarStore } from "@/src/store/NavBarStore";

export default function NavBar() {
   const { navBarClose, navBarOpen, navBarIsOpen } = useNavBarStore();

   function toggleMenu(e: React.MouseEvent<HTMLDivElement>) {
      e.stopPropagation();
      navBarIsOpen ? navBarClose() : navBarOpen();
   }

   return (
      <StyledNav onClick={toggleMenu}>
         <Image
            src={navBarIsOpen ? logo : logoX}
            alt="Logo"
            width={navBarIsOpen ? 114 : 38}
            height="36"
         />
         <StyledMenuList>
            <NavBarItem
               href="/"
               icone="icons/clientesInativo.svg"
               iconeAtivo="icons/clientesAtivo.svg"
               ativo
            >
               Lista de clientes
            </NavBarItem>
         </StyledMenuList>
         <ExitItem />
      </StyledNav>
   );
}
