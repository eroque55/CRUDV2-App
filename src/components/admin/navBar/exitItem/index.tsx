import Image from "next/image";
import { StyledExitItem, StyledText } from "./index.styles";
import { useNavBarStore } from "@/src/store/NavBarStore";
import { toast } from "react-toastify";
import { ConfirmationToast } from "@/src/components/common/toastify/confirmationToast";
import { useRouter } from "next/navigation";

export default function ExitItem() {
   const { navBarIsOpen } = useNavBarStore();
   const router = useRouter();

   return (
      <StyledExitItem
         onClick={(e) => {
            e.stopPropagation();
            toast(ConfirmationToast, {
               data: {
                  title: "Tem certeza?",
                  message: "Tem certeza que deseja sair?",
                  notConfirmation: true,
                  successMessage: "",
                  actionButton: "Sair",
                  onSubmit: () => router.push("/"),
               },
               toastId: "exit",
               autoClose: false,
               position: "top-center",
               closeButton: false,
               hideProgressBar: true,
            });
         }}
      >
         <Image
            src="/icons/exit.svg"
            alt="Icone de sair"
            width={20}
            height={20}
         />
         {navBarIsOpen && <StyledText>Sair</StyledText>}
      </StyledExitItem>
   );
}
