import IconComponent from '../Icon';
import { Container, Circle } from './styles';

interface Props {
  active?: boolean;
}

const CheckBox = ({ active = false }: Props) => {
  return (
    <Container $active={active}>
      <IconComponent name="CheckWhiteIcon" size={12} />
    </Container>
  );
};

export default CheckBox;
