import { HeaderContainer } from "./styles";
import HeaderTop from "../HeaderTop";
import HeaderMain from "../HeaderMain";
import { Line } from "../Line";
import HeaderCategories from "../HeaderCategories";

interface Props {
   categories?: boolean;
}

export default function Header({ categories = true }: Props) {
   return (
      <HeaderContainer>
         <HeaderTop />
         <HeaderMain />
         {categories && <HeaderCategories />}
         <Line $width="80%" $color="bw3" />
      </HeaderContainer>
   );
}
