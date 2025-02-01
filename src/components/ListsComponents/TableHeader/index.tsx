import { StyledTableHeader } from "./index.styles";

import {
   StyledTableRow,
   StyledRowActions,
   StyledRowContent,
} from "../table.styles";

interface TableHeaderProps {
   colunas: string[];
}

export default function TableHeader({ colunas }: TableHeaderProps) {
   return (
      <StyledTableRow $header>
         <StyledRowContent>
            {colunas.map((coluna) => (
               <StyledTableHeader key={coluna}>{coluna}</StyledTableHeader>
            ))}
         </StyledRowContent>
         <StyledRowActions>
            <StyledTableHeader $textAlign="center">Ações</StyledTableHeader>
         </StyledRowActions>
      </StyledTableRow>
   );
}
