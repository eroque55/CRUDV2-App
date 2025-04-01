import type { Metadata } from "next";
import { ReactNode } from "react";
import { Roboto } from "next/font/google";
import StyledComponentsRegistry from "@/src/themes/styled-components-registry";
import ClientLayout from "@/src/themes/client-layout";
import QueryProvider from "../utils/QueryProvider";

const roboto = Roboto({
   weight: ["400", "700"],
   variable: "--Roboto",
   subsets: ["latin"],
});

export const metadata: Metadata = {
   title: "Crud V2",
   description: "Crud de engenharia de software 3 em nextjs",
};

const RootLayout = ({ children }: { children: ReactNode }) => {
   return (
      <html lang="pt_BR">
         <body className={`${roboto.variable}`}>
            <QueryProvider>
               <StyledComponentsRegistry>
                  <ClientLayout>{children}</ClientLayout>
               </StyledComponentsRegistry>
            </QueryProvider>
         </body>
      </html>
   );
};

export default RootLayout;
