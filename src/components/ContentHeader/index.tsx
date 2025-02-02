import { StyledTitle } from "@/src/components/Title";
import SearchBar from "@/src/components/SearchBar";
import AddButton from "@/src/components/AddButton";
import {
   StyledContentHeaderOptions,
   StyledContentHeader,
} from "./index.styles";

interface Props {
   children: React.ReactNode;
}

export default function ContentHeader({ children }: Props) {
   return (
      <StyledContentHeader>
         <StyledTitle>{children}</StyledTitle>
         <StyledContentHeaderOptions>
            <SearchBar />
            <AddButton />
         </StyledContentHeaderOptions>
      </StyledContentHeader>
   );
}
