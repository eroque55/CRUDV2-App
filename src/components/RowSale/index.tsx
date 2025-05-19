import ISale from '@/src/interfaces/ISale';
import { capitalizeFirstLetter } from '@/src/utils';
import { confirmationModal } from '@/src/utils/Toasts';
import { updateStatus } from '@/src/services/Sale.service';
import Row from '../Row';
import { IconProps } from '../Icon';

interface Props {
  sale: ISale;
  setUpdate: (update: boolean) => void;
}

const RowSale = ({ sale, setUpdate }: Props) => {
  const createdAt = new Date(sale.createdAt).toLocaleDateString('pt-BR');
  const collumns = [
    String(sale.id),
    sale?.cart?.customer?.name,
    createdAt,
    capitalizeFirstLetter(sale.status),
  ];

  const acceptPayment: IconProps = {
    name: 'CheckCircleIcon',
    onClick: () =>
      confirmationModal({
        title: 'Tem certeza?',
        message: 'Tem certeza que deseja definir o status como Aprovada?',
        successMessage: 'Status alterado com sucesso!',
        confirmButton: 'Alterar status',
        confirmAction: async () => {
          await updateStatus(sale.id, 'APROVADA');
          setUpdate(true);
        },
        cancelButton: 'Cancelar',
      }),
    height: 20,
  };
  const refusePayment: IconProps = {
    name: 'XCircleIcon',
    onClick: () =>
      confirmationModal({
        title: 'Tem certeza?',
        message: 'Tem certeza que deseja definir o status como Reprovada?',
        successMessage: 'Status alterado com sucesso!',
        confirmButton: 'Alterar status',
        confirmAction: async () => {
          await updateStatus(sale.id, 'REPROVADA');
          setUpdate(true);
        },
        cancelButton: 'Cancelar',
      }),

    height: 20,
  };

  const startDelivery: IconProps = {
    name: 'DeliveryCircleIcon',
    onClick: () =>
      confirmationModal({
        title: 'Tem certeza?',
        message:
          'Tem certeza que deseja definir o status como Transporte Iniciado?',
        successMessage: 'Status alterado com sucesso!',
        confirmButton: 'Alterar status',
        confirmAction: async () => {
          await updateStatus(sale.id, 'TRANSPORTE_INICIADO');
          setUpdate(true);
        },
        cancelButton: 'Cancelar',
      }),
    height: 20,
  };

  const setDelivered: IconProps = {
    name: 'CheckCircleIcon',
    onClick: () =>
      confirmationModal({
        title: 'Tem certeza?',
        message: 'Tem certeza que deseja definir o status como Entregue?',
        successMessage: 'Status alterado com sucesso!',
        confirmButton: 'Alterar status',
        confirmAction: async () => {
          await updateStatus(sale.id, 'ENTREGUE');
          setUpdate(true);
        },
        cancelButton: 'Cancelar',
      }),
    height: 20,
  };

  const acceptTrade: IconProps = {
    name: 'CheckCircleIcon',
    onClick: () =>
      confirmationModal({
        title: 'Tem certeza?',
        message: 'Tem certeza que deseja definir o status como Troca Aprovada?',
        successMessage: 'Status alterado com sucesso!',
        confirmButton: 'Alterar status',
        confirmAction: async () => {
          await updateStatus(sale.id, 'TROCA_APROVADA');
          setUpdate(true);
        },
        cancelButton: 'Cancelar',
      }),
    height: 20,
  };
  const refuseTrade: IconProps = {
    name: 'XCircleIcon',
    onClick: () =>
      confirmationModal({
        title: 'Tem certeza?',
        message:
          'Tem certeza que deseja definir o status como Troca Reprovada?',
        successMessage: 'Status alterado com sucesso!',
        confirmButton: 'Alterar status',
        confirmAction: async () => {
          await updateStatus(sale.id, 'TROCA_REPROVADA');
          setUpdate(true);
        },
        cancelButton: 'Cancelar',
      }),
    height: 20,
  };

  const startDeliveryTrade: IconProps = {
    name: 'DeliveryCircleIcon',
    onClick: () =>
      confirmationModal({
        title: 'Tem certeza?',
        message:
          'Tem certeza que deseja definir o status como Troca Finalizada?',
        successMessage: 'Status alterado com sucesso!',
        confirmButton: 'Alterar status',
        confirmAction: async () => {
          await updateStatus(sale.id, 'TROCA_FINALIZADA');
          setUpdate(true);
        },
        cancelButton: 'Cancelar',
      }),
    height: 20,
  };

  const actions: IconProps[] = [];

  if (sale.status === 'EM_PROCESSAMENTO') {
    actions.push(acceptPayment, refusePayment);
  }

  if (sale.status === 'APROVADA') {
    actions.push(startDelivery);
  }

  if (sale.status === 'TRANSPORTE_INICIADO') {
    actions.push(setDelivered);
  }

  if (sale.status === 'TROCA_SOLICITADA') {
    actions.push(acceptTrade, refuseTrade);
  }

  if (sale.status === 'TROCA_APROVADA') {
    actions.push(startDeliveryTrade);
  }

  return <Row content={collumns} actions={actions} />;
};

export default RowSale;
