import Image from "next/image";
import { StyledExitItem, StyledText } from "./index.styles";
import { useNavBarStore, useSairModalStore } from "@/src/store/NavBarStore";

export default function ExitItem() {
   const { navBarIsOpen } = useNavBarStore();
   const { exitOpenModal: sairOpenModal } = useSairModalStore();
   return (
      <StyledExitItem
         onClick={(e) => {
            e.stopPropagation();
            sairOpenModal();
         }}
      >
         <Image
            src="/icons/sair.svg"
            alt="Icone de sair"
            width={20}
            height={20}
         />
         {navBarIsOpen && <StyledText>Sair</StyledText>}
      </StyledExitItem>
   );
}
