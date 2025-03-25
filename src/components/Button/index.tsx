import IconComponent, { IconT } from "../Icon";
import { StyledButton } from "./styles";

interface Props {
   children?: React.ReactNode;
   width?: string;
   wired?: boolean;
   icon?: IconT;
   onClick?: () => void;
}

const ButtonComponent = ({ children, width, wired, icon, onClick }: Props) => {
   return (
      <StyledButton onClick={onClick} $width={width} $wired={wired}>
         {icon && <IconComponent name={icon} size={20} />}
         {children}
      </StyledButton>
   );
};

export default ButtonComponent;
