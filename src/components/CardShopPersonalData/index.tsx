import { capitalizeFirstLetter, formatCpf, formatPhone } from '@/src/utils';
import ICustomer from '@/src/interfaces/ICustomer';
import { CSSProperties } from 'styled-components';
import Card from '../Card';
import { CardContentProps } from '../CardContentContainer';
import { CardButtonProps } from '../CardButton';

interface Props {
  customer: ICustomer;
  style?: CSSProperties;
  setUpdateIsOpen?: (value: boolean) => void;
}

const CardShopPersonalData = ({ customer, style, setUpdateIsOpen }: Props) => {
  const birthDate = new Date(customer.birthDate).toLocaleDateString('pt-BR');

  const phone = customer.phone.ddd + customer.phone.number;

  const cardContent: CardContentProps[] = [
    {
      title: 'Nome',
      children: customer.name,
    },
    {
      title: 'Data de nascimento',
      children: birthDate,
    },
    {
      title: 'CPF',
      children: formatCpf(customer?.cpf),
    },
    {
      title: 'Gênero',
      children: capitalizeFirstLetter(customer.gender),
    },
    {
      title: 'E-mail',
      children: customer.email,
    },
    {
      title: 'Ranking',
      children: customer.ranking,
    },
    {
      title: 'Status',
      children: customer.status ? 'Ativo' : 'Inativo',
    },
    {
      title: 'Tipo de telefone',
      children: capitalizeFirstLetter(customer.phone.phoneType),
    },
    {
      title: 'Telefone',
      children: formatPhone(phone),
    },
  ];

  const updateButton: CardButtonProps = {
    icon: 'EditIcon',
    onClick: () => {
      if (setUpdateIsOpen) {
        setUpdateIsOpen(true);
      }
    },
  };

  return (
    <Card
      cardContent={cardContent}
      style={style}
      cardButtons={[updateButton]}
    />
  );
};

export default CardShopPersonalData;
