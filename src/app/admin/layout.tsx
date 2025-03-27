"use client";

import NavBar from "@/src/components/NavBar";
import { StyledContent, StyledMain } from "./styles";

interface Props {
   children: React.ReactNode;
}

const AdminLayout = ({ children }: Props) => {
   return (
      <>
         <StyledMain>
            <NavBar />
            <StyledContent>{children}</StyledContent>
         </StyledMain>
      </>
   );
};

export default AdminLayout;
