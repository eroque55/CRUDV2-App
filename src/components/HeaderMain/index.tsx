import Image from "next/image";
import { HeaderMainContainer, ActionsContainer, StyledButton } from "./styles";
import { LogoFullBlackImg } from "@/public";
import SearchBar from "../SearchBar";
import IconComponent from "../Icon";
import { useRouter } from "next/navigation";

const HeaderMain = () => {
   const router = useRouter();

   return (
      <HeaderMainContainer>
         <Image
            src={LogoFullBlackImg}
            alt="Logo"
            onClick={() => router.push("/shop")}
            style={{ cursor: "pointer" }}
         />
         <SearchBar />
         <ActionsContainer>
            <StyledButton>
               <IconComponent name="CartIcon" />
               Carrinho
            </StyledButton>
            <StyledButton>
               <IconComponent name="ProfileIcon" />
               Meu perfil
            </StyledButton>
         </ActionsContainer>
      </HeaderMainContainer>
   );
};

export default HeaderMain;
