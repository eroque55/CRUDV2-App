import IconComponent from '../Icon';
import { StyledSearchConatiner, StyledSearchInput } from './styles';

interface Props {
  setTitle: (title: string) => void;
}

export default function SearchBar({ setTitle }: Props) {
  return (
    <StyledSearchConatiner>
      <IconComponent name="SearchIcon" />

      <StyledSearchInput
        type="search"
        placeholder="Pesquisar produtos..."
        onChange={value => setTitle(value.target.value)}
      />
    </StyledSearchConatiner>
  );
}
