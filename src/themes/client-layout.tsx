"use client";

import { ReactNode } from "react";
import { ThemeProvider, type DefaultTheme } from "styled-components";
import EstilosGlobais from "./EstilosGlobais";

const theme: DefaultTheme = {
   colors: {
      principal: {
         cor: "#468FAF",
         cor2: "#2A6F97",
         cor3: "#01497C",
         cor4: "#012A4A",
         cor5: "#01182B",
      },
      neutros: {
         cor: "#fff",
         cor2: "#f5f5f5",
         cor3: "#d1d1d1",
         cor4: "#a2a2a2",
         cor5: "#747474",
         cor6: "#454545",
         cor7: "#2d2d2d",
         cor8: "#161616",
      },
      alertas: {
         verde: "#008000",
         vermelho: "#A4161A",
      },
   },
   fonts: {
      roboto: {
         regular: "Roboto, sans-serif 400",
         bold: "Roboto, sans-serif 700",
      },
   },
};

export default function ClientLayout({ children }: { children: ReactNode }) {
   return (
      <ThemeProvider theme={theme}>
         <EstilosGlobais />
         {children}
      </ThemeProvider>
   );
}
