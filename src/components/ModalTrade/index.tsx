import useTradeModal from '@/src/hooks/useTradeModal';
import { successModal } from '@/src/utils/Toasts';
import { updateStatus } from '@/src/services/Sale.service';
import ModalBackground from '../ModalBackground';
import ModalHeader from '../ModalHeader';
import { ModalContainer } from '../Modal/styles';
import { Container } from './styles';
import { ModalFooterButton, ModalFooterContainer } from '../ModalFooter/styles';
import ModalTradeItem from './ModalTradeItem';

interface Props {
  setUpdate: (value: boolean) => void;
}

const ModalTrade = ({ setUpdate }: Props) => {
  const { closeModal, saleId } = useTradeModal();

  if (!saleId) {
    return null;
  }
  const onSubmit = async () => {
    successModal('Troca solicitada com sucesso!');
    await updateStatus(saleId, 'TROCA_SOLICITADA');
    setUpdate(true);
    closeModal();
  };

  return (
    <ModalBackground>
      <ModalContainer $width="40rem">
        <ModalHeader>Solicitar Troca</ModalHeader>

        <Container>
          <ModalTradeItem title="As Crônicas de Nárnia" />

          <ModalTradeItem title="As Crônicas de Nárnia" />

          <ModalTradeItem title="As Crônicas de Nárnia" />

          <ModalTradeItem title="O Hobbit" />

          <ModalTradeItem title="O Hobbit" />
        </Container>

        <ModalFooterContainer>
          <ModalFooterButton onClick={() => closeModal()}>
            Cancelar
          </ModalFooterButton>

          <ModalFooterButton
            onClick={e => {
              e.preventDefault();
              onSubmit();
            }}
          >
            Trocar
          </ModalFooterButton>
        </ModalFooterContainer>
      </ModalContainer>
    </ModalBackground>
  );
};

export default ModalTrade;
