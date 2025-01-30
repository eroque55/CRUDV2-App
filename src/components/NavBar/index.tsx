import Image from "next/image";
import styled from "styled-components";

import ItemNavegacao from "@/src/components/NavBar/ItemNavegacao";
import logo from "@/public/images/logo.svg";

const NavBarConatiner = styled.nav`
   display: flex;
   flex-direction: column;
   background-color: ${({ theme }) => theme.colors.neutros.cor};
   border-radius: 0.5rem;
   box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.25);
   padding: 1.5rem 0.75rem;
   width: fit-content;
   height: 100%;
   gap: 1.5rem;
   align-items: center;
`;

const ListaDeItens = styled.ul`
   display: flex;
   flex-direction: column;
   gap: 0.5rem;
   height: 100%;
`;

const NavBar = () => {
   return (
      <NavBarConatiner>
         <Image src={logo} alt="Logo" width="114" height="36" />
         <ListaDeItens>
            <ItemNavegacao
               href="/"
               icone="icons/clientesInativo.svg"
               iconeAtivo="icons/clientesAtivo.svg"
            >
               Lista de clientes
            </ItemNavegacao>
            <ItemNavegacao
               href="/"
               icone="icons/clientesInativo.svg"
               iconeAtivo="icons/clientesAtivo.svg"
               ativo
            >
               Lista de clientes
            </ItemNavegacao>
         </ListaDeItens>
         <ItemNavegacao href="/" icone="icons/sair.svg">
            Sair
         </ItemNavegacao>
      </NavBarConatiner>
   );
};

export default NavBar;
