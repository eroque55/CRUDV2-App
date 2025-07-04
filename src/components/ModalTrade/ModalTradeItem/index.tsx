import { useState } from 'react';
import CheckBox from '../../CheckBox';
import { Container } from './styles';

interface Props {
  title: string;
}

const ModalTradeItem = ({ title }: Props) => {
  const [isSelected, setIsSelected] = useState(false);

  return (
    <Container onClick={() => setIsSelected(!isSelected)}>
      <CheckBox active={isSelected} />

      {title}
    </Container>
  );
};

export default ModalTradeItem;
