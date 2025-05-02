import { useForm } from 'react-hook-form';
import {
  confirmationModal,
  errorModal,
  IConfirmationToast,
  successModal,
} from '@/src/utils/Toasts';
import ICustomer from '@/src/interfaces/ICustomer';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  CardCreateSchema,
  ICardCreateSchema,
} from '@/src/validations/CardCreateSchema';
import ICard from '@/src/interfaces/ICard';
import { createCard } from '@/src/services/Card.service';
import { useParams } from 'next/navigation';
import { getCustomer } from '@/src/services/Customer.service';
import ModalBackground from '../ModalBackground';
import InputField from '../InputField';
import ModalHeader from '../ModalHeader';
import ModalFooter from '../ModalFooter';
import ModalForm from '../ModalForm';
import { ModalContainer } from '../Modal/styles';

interface Props {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}

const ModalCardCreate = ({ isOpen, setIsOpen }: Props) => {
  const params = useParams();
  const { data: customer, refetch } = getCustomer(Number(params.id));

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<ICardCreateSchema>({
    resolver: yupResolver(CardCreateSchema),
    mode: 'onBlur',
  });

  const confModal: IConfirmationToast = {
    title: 'Cancelar Cadastro',
    message: 'Deseja realmente cancelar o cadastro?',
    confirmButton: 'Cancelar',
    cancelButton: 'Voltar',
    confirmAction: () => {
      setIsOpen(false);
      reset();
    },
  };

  const onCancel = () => {
    confirmationModal(confModal);
  };

  const onSubmit = async (data: ICardCreateSchema) => {
    try {
      const card: Partial<ICard> = {
        customer: customer as ICustomer,
        number: data.number,
        cardholder: data.cardholder,
        cvv: data.cvv,
        expirationDate: data.expirationDate,
        cardBrand: data.cardBrand as
          | 'VISA'
          | 'MASTERCARD'
          | 'AMERICAN_EXPRESS'
          | 'DISCOVER'
          | 'DINNERS_CLUB'
          | 'JCB'
          | 'OUTRA',
        preferential: false,
      };

      await createCard(card as ICard);
      reset();
      setIsOpen(false);
      await refetch();
      successModal('Cartão cadastrado com sucesso!');
    } catch (error: any) {
      errorModal(error.response.data);
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <ModalBackground>
      <ModalContainer $width="40rem">
        <ModalHeader>Cadastrar contato</ModalHeader>
        <ModalForm>
          <InputField
            id="number"
            label="Número do cartão"
            mask="0000 0000 0000 0000"
            type="maskedInput"
            register={register}
            placeholder="Insira o número do cartão"
            error={errors.number?.message}
            onAccept={value => {
              setValue('number', value.replace(/[\ ]/g, ''));
            }}
          />
          <InputField
            id="expirationDate"
            label="Vencimento"
            mask="00/00"
            type="maskedInput"
            register={register}
            placeholder="Insira o vencimento"
            error={errors.expirationDate?.message}
            onAccept={value => {
              setValue('expirationDate', value.replace(/[\/]/g, ''));
            }}
          />
          <InputField
            id="cardholder"
            label="Nome do titular"
            register={register}
            placeholder="Insira o nome do titular"
            error={errors.cardholder?.message}
          />
          <InputField
            id="cvv"
            label="Código de segurança (CVV)"
            mask="000"
            type="maskedInput"
            register={register}
            placeholder="Insira o código de segurança"
            error={errors.expirationDate?.message}
            onAccept={value => {
              setValue('cvv', value);
            }}
          />
          <InputField
            id="cardBrand"
            label="Bandeira do cartão"
            register={register}
            type="select"
            selectOptions={[
              { value: 'VISA', label: 'Visa' },
              { value: 'MASTERCARD', label: 'Mastercard' },
              { value: 'AMERICAN_EXPRESS', label: 'American Express' },
              { value: 'DISCOVER', label: 'Discover' },
              { value: 'DINERS_CLUB', label: 'Diners Club' },
              { value: 'JCB', label: 'JCB' },
              { value: 'OUTRA', label: 'Outra' },
            ]}
            error={errors.cardBrand?.message}
          />
        </ModalForm>
        <ModalFooter
          confirmButtonType="submit"
          cancelButton="Cancelar"
          confirmAction={handleSubmit(onSubmit)}
          cancelAction={onCancel}
        >
          Cadastrar
        </ModalFooter>
      </ModalContainer>
    </ModalBackground>
  );
};

export default ModalCardCreate;
