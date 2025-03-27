import type { Metadata } from "next";
import { ReactNode } from "react";
import { Roboto } from "next/font/google";
import StyledComponentsRegistry from "@/src/themes/styled-components-registry";
import ClientLayout from "@/src/themes/client-layout";
import { ToastContainer } from "react-toastify";

const roboto = Roboto({
   weight: ["400", "700"],
   variable: "--Roboto",
   subsets: ["latin"],
});

export const metadata: Metadata = {
   title: "Crud V2",
   description: "Crud de engenharia de software 3 em nextjs",
};

export default function RootLayout({ children }: { children: ReactNode }) {
   return (
      <html lang="pt_BR">
         <body className={`${roboto.variable}`}>
            <StyledComponentsRegistry>
               <ClientLayout>
                  {children}
                  <ToastContainer />
               </ClientLayout>
            </StyledComponentsRegistry>
         </body>
      </html>
   );
}
