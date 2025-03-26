import IconComponent, { IconT } from "../Icon";
import { CardButtonContainer } from "./styles";

interface Props {
   icon: IconT;
   onClick: () => void;
}

const CardButton = ({ icon, onClick }: Props) => {
   return (
      <CardButtonContainer onClick={onClick}>
         <IconComponent name={icon} />
      </CardButtonContainer>
   );
};

export default CardButton;
