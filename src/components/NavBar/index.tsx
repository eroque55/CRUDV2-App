import Image from "next/image";

import NavBarItem from "@/src/components/NavBarItem";
import { StyledMenuList, StyledNav } from "./styles";
import { LogoRBlackImg } from "@/public";
import { usePathname, useRouter } from "next/navigation";
import { confirmationModal } from "@/src/utils/Toasts";

export default function NavBar() {
   const pathname = usePathname();
   const router = useRouter();

   const handleLogout = () => {
      confirmationModal({
         title: "Tem certeza?",
         message: "Tem certeza que deseja sair?",
         confirmButton: "Sair",
         confirmAction: () => {
            router.push("/");
         },
         cancelButton: "Cancelar",
      });
   };

   const customersPath = "/admin/customers";
   const salesPath = "/admin/sales";
   const dashboardPath = "/admin/dashboard";

   return (
      <StyledNav>
         <Image src={LogoRBlackImg} alt="Logo" height="43" />
         <StyledMenuList>
            <NavBarItem
               href={customersPath}
               icon={
                  pathname.includes(customersPath)
                     ? "CustomersActiveIcon"
                     : "CustomersInactiveIcon"
               }
               active={pathname.includes(customersPath)}
            />
            <NavBarItem
               href={salesPath}
               icon={
                  pathname.includes(salesPath)
                     ? "SalesActiveIcon"
                     : "SalesInactiveIcon"
               }
               active={pathname.includes(salesPath)}
            />
            <NavBarItem
               href={dashboardPath}
               icon={
                  pathname.includes(dashboardPath)
                     ? "DashboardActiveIcon"
                     : "DashboardInactiveIcon"
               }
               active={pathname.includes(dashboardPath)}
            />
         </StyledMenuList>
         <NavBarItem icon={"ExitGrayIcon"} onClick={handleLogout}></NavBarItem>
      </StyledNav>
   );
}
