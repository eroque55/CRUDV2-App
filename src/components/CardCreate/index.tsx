import { CSSProperties } from 'styled-components';
import { Container } from './styles';
import IconComponent from '../Icon';

export interface CardProps {
  onClick?: () => void;
  style?: CSSProperties;
}

const CardCreate = ({ style, onClick }: CardProps) => {
  return (
    <Container style={style} onClick={onClick}>
      <IconComponent name="PlusCartIcon" width={25} height={25} />
    </Container>
  );
};

export default CardCreate;
