import { capitalizeFirstLetter, formatValue } from '@/src/utils';
import { CSSProperties } from 'styled-components';
import ISale from '@/src/interfaces/ISale';
import { updateStatus } from '@/src/services/Sale.service';
import { CardButtonProps } from '../CardButton';
import { CardContentProps } from '../CardContentContainer';
import Card from '../Card';

interface Props {
  sale: ISale;
  setUpdate?: (update: boolean) => void;
  style?: CSSProperties;
}

const CardShopSale = ({ sale, style, setUpdate }: Props) => {
  const createdAt = new Date(sale.createdAt);
  const value = Number(sale.totalValue);
  const cardContent: CardContentProps[] = [
    {
      title: 'Data',
      children: createdAt.toLocaleDateString('pt-BR'),
    },
    {
      title: 'Valor total',
      children: formatValue(value),
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

  const requestExchange = async () => {
    await updateStatus(sale.id, 'TROCA_SOLICITADA');
    if (setUpdate) {
      setUpdate(true);
    }
  };

  const tradeButton: CardButtonProps = {
    icon: 'TradeIcon',
    onClick: () => requestExchange(),
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
