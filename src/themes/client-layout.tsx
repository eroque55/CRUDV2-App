"use client";

import { ReactNode } from "react";
import { ThemeProvider, type DefaultTheme } from "styled-components";
import EstilosGlobais from "./EstilosGlobais";

const theme: DefaultTheme = {
   colors: {
      primary: {
         color: "#468FAF",
         color2: "#2A6F97",
         color3: "#01497C",
         color4: "#012A4A",
         color5: "#01182B",
      },
      neutral: {
         color: "#fff",
         color2: "#f5f5f5",
         color3: "#d1d1d1",
         color4: "#a2a2a2",
         color5: "#747474",
         color6: "#454545",
         color7: "#2d2d2d",
         color8: "#161616",
      },
      alerts: {
         success: "#008000",
         fail: "#A4161A",
      },
   },
   fonts: {
      roboto: {
         fontFamily: "--Roboto, sans-serif",
         regular: "400",
         bold: "700",
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
