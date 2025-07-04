import { capitalizeFirstLetter, formatCurrency } from '@/src/utils';
import { CSSProperties } from 'styled-components';
import ISale from '@/src/interfaces/ISale';
import useTradeModal from '@/src/hooks/useTradeModal';
import { CardButtonProps } from '../CardButton';
import { CardContentProps } from '../CardContentContainer';
import Card from '../Card';

interface Props {
  sale: ISale;
  style?: CSSProperties;
}

const CardShopSale = ({ sale, style }: Props) => {
  const { openModal } = useTradeModal();
  const createdAt = new Date(sale.createdAt);
  const value = Number(sale.totalValue);
  const cardContent: CardContentProps[] = [
    {
      title: 'Data',
      children: createdAt.toLocaleDateString('pt-BR'),
    },
    {
      title: 'Valor total',
      children: formatCurrency(value),
    },
    {
      title: 'Status',
      children: capitalizeFirstLetter(sale.status),
    },
    {
      title: 'Metodo de pagamento',
      children: sale.paymentMethod,
    },
    {
      title: 'Endereço de entrega',
      children: sale.freight.address.nickname,
    },
  ];

  const tradeButton: CardButtonProps = {
    icon: 'TradeIcon',
    onClick: () => openModal(sale.id),
  };

  const cardButtons = [];

  if (sale.status === 'ENTREGUE') {
    cardButtons.push(tradeButton);
  }

  return (
    <Card cardContent={cardContent} cardButtons={cardButtons} style={style} />
  );
};

export default CardShopSale;
