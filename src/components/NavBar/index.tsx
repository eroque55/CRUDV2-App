import Image from "next/image";

import NavBarItem from "@/src/components/NavBar/NavItem";
import logoFull from "@/public/images/logo-full.svg";
import logoOnlyR from "@/public/images/logo-only-r.svg";
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
            src={navBarIsOpen ? logoFull : logoOnlyR}
            alt="Logo"
            height="43"
         />
         <StyledMenuList>
            <NavBarItem
               href="/"
               icone="/icons/clientesInativo.svg"
               iconeAtivo="/icons/clientesAtivo.svg"
               ativo
            >
               Lista de clientes
            </NavBarItem>
         </StyledMenuList>
         <ExitItem />
      </StyledNav>
   );
}
