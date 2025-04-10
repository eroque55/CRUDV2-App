import Image from "next/image";
import { HeaderMainContainer, ActionsContainer, StyledButton } from "./styles";
import { LogoFullBlackImg } from "@/public";
import SearchBar from "../SearchBar";
import IconComponent from "../Icon";
import { useRouter } from "next/navigation";
import useBookFilter from "@/src/hooks/useBookFilter";
import useCategoryFilter from "@/src/hooks/useCategoryFilter";
import { getBooks } from "@/src/services/Book.service";

const HeaderMain = () => {
   const router = useRouter();
   const { title, setTitle } = useBookFilter();
   const { slug } = useCategoryFilter();
   const { refetch } = getBooks(slug, title);

   return (
      <HeaderMainContainer>
         <Image
            src={LogoFullBlackImg}
            alt="Logo"
            onClick={() => router.push("/shop")}
            style={{ cursor: "pointer" }}
         />
         <SearchBar setTitle={setTitle} />
         <ActionsContainer>
            <StyledButton onClick={() => router.push("/shop/cart")}>
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
