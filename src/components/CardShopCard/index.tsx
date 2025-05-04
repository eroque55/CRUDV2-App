import ICard from '@/src/interfaces/ICard';
import { capitalizeFirstLetter } from '@/src/utils';
import { deleteCard, updateCard } from '@/src/services/Card.service';
import { confirmationModal, errorModal } from '@/src/utils/Toasts';
import { CSSProperties } from 'styled-components';
import { CardButtonProps } from '../CardButton';
import { CardContentProps } from '../CardContentContainer';
import Card from '../Card';

interface Props {
  card: ICard;
  setUpdate?: (update: boolean) => void;
  style?: CSSProperties;
}

const CardShopCard = ({ card, style, setUpdate }: Props) => {
  const handleDeleteCard = async () => {
    try {
      await deleteCard(card.id);
      if (setUpdate) {
        setUpdate(true);
      }
    } catch (error: any) {
      errorModal(error.response.data);
    }
  };

  const handleSetPreferential = async () => {
    try {
      await updateCard(card.id);
      if (setUpdate) {
        setUpdate(true);
      }
    } catch (error: any) {
      errorModal(error.response.data);
    }
  };

  const expirationDate = `${card.expirationDate.slice(0, 2)}/${card.expirationDate.slice(2)}`;

  const cardContent: CardContentProps[] = [
    {
      title: 'Número do cartão',
      children: card.number,
    },
    {
      title: 'Nome do titular',
      children: card.cardholder,
    },
    {
      title: 'Validade',
      children: expirationDate,
    },
    {
      title: 'Bandeira do cartão',
      children: capitalizeFirstLetter(card.cardBrand),
    },
  ];

  const preferentialButton: CardButtonProps = {
    icon: 'CheckGreenIcon',
    onClick: handleSetPreferential,
  };

  const deleteButton: CardButtonProps = {
    icon: 'TrashRedIcon',
    onClick: () =>
      confirmationModal({
        title: 'Excluir cartão',
        message: 'Deseja realmente excluir este cartão?',
        confirmButton: 'Excluir',
        cancelButton: 'Cancelar',
        confirmAction: handleDeleteCard,
        notice: 'Essa ação não poderá ser desfeita.',
        successMessage: 'Cartão excluído com sucesso!',
      }),
  };

  const cardButtons: CardButtonProps[] = [];
  if (!card.preferential) {
    cardButtons.push(preferentialButton);
  }
  cardButtons.push(deleteButton);

  return (
    <Card
      cardContent={cardContent}
      active={card.preferential}
      cardButtons={cardButtons}
      style={style}
    />
  );
};

export default CardShopCard;
