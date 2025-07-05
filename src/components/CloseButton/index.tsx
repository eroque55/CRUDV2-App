import { CloseButtonContainer } from './styles';
import IconComponent from '../Icon';

interface Props {
  onClick: () => void;
}

const CloseButton = ({ onClick }: Props) => {
  return (
    <CloseButtonContainer type="button" onClick={onClick}>
      <IconComponent name="XCircleIcon" />
    </CloseButtonContainer>
  );
};

export default CloseButton;
