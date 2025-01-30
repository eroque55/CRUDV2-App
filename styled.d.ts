import "styled-components";

declare module "styled-components" {
   export interface DefaultTheme {
      colors: {
         principal: {
            cor: string;
            cor2: string;
            cor3: string;
            cor4: string;
            cor5: string;
         };
         neutros: {
            cor: string;
            cor2: string;
            cor3: string;
            cor4: string;
            cor5: string;
            cor6: string;
            cor7: string;
            cor8: string;
         };
         alertas: {
            verde: string;
            vermelho: string;
         };
      };
   }
}
