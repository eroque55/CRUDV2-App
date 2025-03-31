import IconComponent from "../Icon";
import { StyledSearchConatiner, StyledSearchInput } from "./styles";

export default function SearchBar() {
   return (
      <StyledSearchConatiner>
         <IconComponent name="SearchIcon" />
         <StyledSearchInput type="search" placeholder="Pesquisar produtos..." />
      </StyledSearchConatiner>
   );
}
