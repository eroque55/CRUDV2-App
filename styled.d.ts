import { fail } from "assert";
import "styled-components";

declare module "styled-components" {
   export interface DefaultTheme {
      colors: {
         primary: {
            color: string;
            color2: string;
            color3: string;
            color4: string;
            color5: string;
         };
         neutral: {
            color: string;
            color2: string;
            color3: string;
            color4: string;
            color5: string;
            color6: string;
            color7: string;
            color8: string;
         };
         alerts: {
            success: string;
            fail: string;
         };
      };
      fonts: {
         roboto: {
            fontFamily: string;
            regular: string;
            bold: string;
         };
      };
   }
}
