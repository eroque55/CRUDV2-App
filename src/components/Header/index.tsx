import useAuthStore from "@/src/store/CustomerShopStore";
import {
   HelloContainer,
   StyledHeader,
   StyledHello,
   StyledLogoutButton,
} from "./styles";
import { useRouter } from "next/navigation";
import IconComponent from "../Icon";
import { confirmationModal } from "@/src/utils/Toasts";

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
                  confirmationModal({
                     title: "Tem certeza?",
                     message: "Tem certeza que deseja sair?",
                     confirmButton: "Sair",
                     confirmAction: () => {
                        handleLogout();
                     },
                     cancelButton: "Cancelar",
                  });
               }}
            >
               Sair
               <IconComponent name="ExitBlueIcon" />
            </StyledLogoutButton>
         </HelloContainer>
         sdasda
      </StyledHeader>
   );
}
