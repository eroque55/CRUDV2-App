import { StyledTitle } from "@/src/components/Commom/Title";
import SearchBar from "@/src/components/Commom/SearchBar";
import AddButton from "@/src/components/Commom/AddButton";
import {
   StyledContentHeaderOptions,
   StyledContentHeader,
} from "./index.styles";
import { useCreateModalStore } from "@/src/store/CustomerListingStore";

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
