import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  confirmationModal,
  errorModal,
  IConfirmationToast,
  successModal,
} from '@/src/utils/Toasts';
import {
  IUpdatePasswordSchema,
  UpdatePasswordSchema,
} from '@/src/validations/UpdatePasswordSchema';
import ICustomer from '@/src/interfaces/ICustomer';
import { getCustomer, updateCustomer } from '@/src/services/Customer.service';
import { useParams } from 'next/navigation';
import InputField from '../InputField';
import ModalForm from '../ModalForm';
import ModalFooter from '../ModalFooter';
import ModalHeader from '../ModalHeader';
import { ModalContainer } from '../Modal/styles';
import ModalBackground from '../ModalBackground';

interface Props {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}

const ModalCustomerPasswordUpdate = ({ isOpen, setIsOpen }: Props) => {
  const params = useParams();
  const { data: customer } = getCustomer(Number(params.id));

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IUpdatePasswordSchema>({
    resolver: yupResolver(UpdatePasswordSchema),
    mode: 'onBlur',
  });

  const confModal: IConfirmationToast = {
    title: 'Cancelar alterações?',
    message: 'Deseja realmente cancelar as alterações?',
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

  const onSubmit = async (data: IUpdatePasswordSchema) => {
    try {
      const customerTemp: Partial<ICustomer> = {
        password: data.newPassword,
        confPassword: data.lastPassword,
      };

      await updateCustomer(customer?.id || 0, customerTemp as ICustomer);
      successModal('Senha alterada com sucesso!');
      setIsOpen(false);
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
        <ModalHeader>Alterar senha</ModalHeader>

        <ModalForm>
          <InputField
            id="lastPassword"
            label="Senha atual"
            register={register}
            placeholder="Insira a senha atual"
            error={errors.lastPassword?.message}
            type="password"
          />

          <InputField
            id="newPassword"
            label="Nova senha"
            register={register}
            placeholder="Insira a nova senha"
            error={errors.newPassword?.message}
            type="password"
          />

          <InputField
            id="confNewPassword"
            label="Confirme a nova senha"
            register={register}
            placeholder="Confirme a nova senha"
            error={errors.confNewPassword?.message}
            type="password"
          />
        </ModalForm>

        <ModalFooter
          confirmButtonType="submit"
          cancelButton="Cancelar"
          confirmAction={handleSubmit(onSubmit)}
          cancelAction={onCancel}
        >
          Alterar
        </ModalFooter>
      </ModalContainer>
    </ModalBackground>
  );
};

export default ModalCustomerPasswordUpdate;
