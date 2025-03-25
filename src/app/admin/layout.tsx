"use client";

import NavBar from "@/src/components/NavBar";
import { StyledContent, StyledMain } from "./styles";
import { ToastContainer } from "react-toastify";

interface Props {
   children: React.ReactNode;
}

const AdminLayout = ({ children }: Props) => {
   return (
      <>
         <ToastContainer />
         <StyledMain>
            <NavBar />
            <StyledContent>{children}</StyledContent>
         </StyledMain>
      </>
   );
};

export default AdminLayout;
