import { Container, Circle } from './styles';

interface Props {
  active?: boolean;
}

const Radius = ({ active = false }: Props) => {
  return (
    <Container $active={active}>
      <Circle />
    </Container>
  );
};

export default Radius;
