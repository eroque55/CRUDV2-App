import { HeaderContainer } from "./styles";
import HeaderTop from "../HeaderTop";
import HeaderMain from "../HeaderMain";
import { Line } from "../Line";
import HeaderCategories from "../HeaderCategories";

interface Props {
   showCategories?: boolean;
}

const Header = ({ showCategories = true }: Props) => {
   return (
      <HeaderContainer>
         <HeaderTop />
         <HeaderMain />
         {showCategories && <HeaderCategories />}
         <Line $width="80%" $color="bw3" />
      </HeaderContainer>
   );
};

export default Header;
