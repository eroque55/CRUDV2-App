import { StyledTitle } from "@/src/components/admin/common/title";
import AddButton from "@/src/components/admin/common/addButton";
import {
   StyledContentHeaderOptions,
   StyledContentHeader,
} from "./index.styles";
import {
   useCreateModalStore,
   useFilterModalStore,
} from "@/src/store/CustomerListingStore";
import FilterButton from "@/src/components/admin/common/filterButton";

interface Props {
   children: React.ReactNode;
}

export default function ContentHeader({ children }: Props) {
   const { createOpenModal } = useCreateModalStore();
   const { filterOpenModal } = useFilterModalStore();

   return (
      <StyledContentHeader>
         <StyledTitle>{children}</StyledTitle>
         <StyledContentHeaderOptions>
            <FilterButton onClick={filterOpenModal} />
            <AddButton onClick={createOpenModal} />
         </StyledContentHeaderOptions>
      </StyledContentHeader>
   );
}
