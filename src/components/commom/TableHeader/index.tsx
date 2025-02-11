import { StyledRowHeaderText } from "./index.styles";

import {
   StyledRow,
   StyledRowBodyActions,
   StyledRowBodyContent,
} from "../lists.styles";

interface TableHeaderProps {
   colunas: string[];
}

export default function TableHeader({ colunas }: TableHeaderProps) {
   return (
      <StyledRow $header>
         <StyledRowBodyContent>
            {colunas.map((coluna) => (
               <StyledRowHeaderText key={coluna}>{coluna}</StyledRowHeaderText>
            ))}
         </StyledRowBodyContent>
         <StyledRowBodyActions>
            <StyledRowHeaderText $textAlign="center">Ações</StyledRowHeaderText>
         </StyledRowBodyActions>
      </StyledRow>
   );
}
