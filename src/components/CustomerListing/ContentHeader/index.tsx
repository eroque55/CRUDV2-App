import { StyledTitle } from "@/src/components/commom/Title";
import SearchBar from "@/src/components/commom/SearchBar";
import AddButton from "@/src/components/commom/AddButton";
import {
   StyledContentHeaderOptions,
   StyledContentHeader,
} from "./index.styles";
import { useCreateModalStore } from "@/src/store/CustomerStore";

interface Props {
   children: React.ReactNode;
}

export default function ContentHeader({ children }: Props) {
   const { createOpenModal } = useCreateModalStore();
   return (
      <StyledContentHeader>
         <StyledTitle>{children}</StyledTitle>
         <StyledContentHeaderOptions>
            <SearchBar />
            <AddButton onClick={createOpenModal} />
         </StyledContentHeaderOptions>
      </StyledContentHeader>
   );
}
