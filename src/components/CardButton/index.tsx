import IconComponent, { IconT } from '../Icon';
import { CardButtonContainer } from './styles';

export interface CardButtonProps {
  icon: IconT;
  onClick: () => void;
}

const CardButton = ({ icon, onClick }: CardButtonProps) => {
  return (
    <CardButtonContainer onClick={onClick}>
      <IconComponent name={icon} />
    </CardButtonContainer>
  );
};

export default CardButton;
