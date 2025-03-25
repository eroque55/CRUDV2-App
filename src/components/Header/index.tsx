import useAuthStore from "@/src/store/CustomerShopStore";
import {
   HelloContainer,
   StyledHeader,
   StyledHello,
   StyledLogoutButton,
} from "./index.styles";
import Image from "next/image";
import ExitIcon from "@/public/icons/exit-icon.svg";
import { toast } from "react-toastify";
import { ConfirmationToast } from "@/src/components/common/toastify/ConfirmationToast";
import { useRouter } from "next/navigation";

export default function Header() {
   const { customer, logout } = useAuthStore();
   const router = useRouter();

   const handleLogout = () => {
      logout();
      router.push("/");
   };

   return (
      <StyledHeader>
         <HelloContainer>
            <StyledHello>
               Olá, <strong>{customer?.name}</strong>
            </StyledHello>
            <StyledLogoutButton
               onClick={() => {
                  toast(ConfirmationToast, {
                     data: {
                        title: "Tem certeza?",
                        message: "Tem certeza que deseja sair?",
                        notConfirmation: true,
                        successMessage: "",
                        actionButton: "Sair",
                        onSubmit: handleLogout,
                     },
                     toastId: "exit",
                     autoClose: false,
                     position: "top-center",
                     closeButton: false,
                     hideProgressBar: true,
                  });
               }}
            >
               Sair
               <Image src={ExitIcon} alt="Icone de sair" />
            </StyledLogoutButton>
         </HelloContainer>
         sdasda
      </StyledHeader>
   );
}
