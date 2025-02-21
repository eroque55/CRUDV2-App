import { StyledTitle } from "@/src/components/commom/Title";
import AddButton from "@/src/components/commom/AddButton";
import {
   StyledContentHeaderOptions,
   StyledContentHeader,
} from "./index.styles";
import { useCreateModalStore } from "@/src/store/CustomerListingStore";
import FilterButton from "@/src/components/Commom/FilterButton/index";

interface Props {
   children: React.ReactNode;
}

export default function ContentHeader({ children }: Props) {
   const { createOpenModal } = useCreateModalStore();
   return (
      <StyledContentHeader>
         <StyledTitle>{children}</StyledTitle>
         <StyledContentHeaderOptions>
            <FilterButton />
            <AddButton onClick={createOpenModal} />
         </StyledContentHeaderOptions>
      </StyledContentHeader>
   );
}
