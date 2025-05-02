import { useForm } from 'react-hook-form';
import {
  confirmationModal,
  errorModal,
  IConfirmationToast,
  successModal,
} from '@/src/utils/Toasts';
import { AddressSchema, IAddressSchema } from '@/src/validations/AddressSchema';
import ICountry from '@/src/interfaces/ICountry';
import IState from '@/src/interfaces/IState';
import ICity from '@/src/interfaces/ICity';
import IAddress from '@/src/interfaces/IAddress';
import { createAddress } from '@/src/services/Address.service';
import ICustomer from '@/src/interfaces/ICustomer';
import { yupResolver } from '@hookform/resolvers/yup';
import { useCountries } from '@/src/store/CountryStore';
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

const ModalAddressCreate = ({ isOpen, setIsOpen }: Props) => {
  const { cities, countries, states, getCitiesByState, getStatesByCountry } =
    useCountries();

  const params = useParams();
  const { data: customer, refetch } = getCustomer(Number(params.id));

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<IAddressSchema>({
    resolver: yupResolver(AddressSchema),
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

  const onSubmit = async (data: IAddressSchema) => {
    try {
      const country: Partial<ICountry> = {
        id: Number(data.countryId),
      };

      const state: Partial<IState> = {
        id: Number(data.stateId),
        country: country as ICountry,
      };

      const city: Partial<ICity> = {
        id: Number(data.cityId),
        state: state as IState,
      };

      const address: Partial<IAddress> = {
        customer: customer as ICustomer,
        nickname: data.nickname,
        cep: data.cep,
        street: data.street,
        number: data.number,
        complement: data.complement,
        neighborhood: data.neighborhood,
        city: city as ICity,
        addressType: data.addressType as 'RESIDENCIAL' | 'COBRANCA' | 'ENTREGA',
        residenceType: data.residenceType as 'CASA' | 'APARTAMENTO' | 'OUTRO',
        streetType: data.streetType as
          | 'RUA'
          | 'AVENIDA'
          | 'TRAVESSA'
          | 'ALAMEDA'
          | 'ESTRADA'
          | 'OUTRO',
      };
      await createAddress(address as IAddress);
      reset();
      setIsOpen(false);
      await refetch();
      successModal('Endereço cadastrado com sucesso!');
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
        <ModalHeader>Cadastrar endereço</ModalHeader>
        <ModalForm>
          <InputField
            id="nickname"
            label="Apelido"
            register={register}
            placeholder="Insira um apelido"
            error={errors.nickname?.message}
          />
          <InputField
            id="cep"
            label="CEP"
            mask="00000-000"
            placeholder="Insira o CEP"
            register={register}
            type="maskedInput"
            onAccept={value => {
              setValue('cep', value.replace(/[-]/g, ''));
            }}
            error={errors.cep?.message}
          />
          <InputField
            id="addressType"
            label="Tipo de endereço"
            type="select"
            error={errors.addressType?.message}
            selectOptions={[
              { value: 'RESIDENCIAL', label: 'Residencial' },
              { value: 'COBRANCA', label: 'Cobrança' },
              { value: 'ENTREGA', label: 'Entrega' },
            ]}
            register={register}
          />
          <InputField
            id="residenceType"
            label="Tipo de residência"
            type="select"
            error={errors.residenceType?.message}
            selectOptions={[
              { value: 'CASA', label: 'Casa' },
              { value: 'APARTAMENTO', label: 'Apartamento' },
              { value: 'OUTRO', label: 'Outro' },
            ]}
            register={register}
          />
          <InputField
            id="streetType"
            label="Tipo de logradouro"
            type="select"
            error={errors.streetType?.message}
            selectOptions={[
              { value: 'RUA', label: 'Rua' },
              { value: 'AVENIDA', label: 'Avenida' },
              { value: 'TRAVESSA', label: 'Travessa' },
              { value: 'ALAMEDA', label: 'Alameda' },
              { value: 'ESTRADA', label: 'Estrada' },
              { value: 'OUTRO', label: 'Outro' },
            ]}
            register={register}
          />
          <InputField
            id="street"
            label="Logradouro"
            register={register}
            placeholder="Insira o logradouro"
            error={errors.street?.message}
          />
          <InputField
            id="number"
            label="Número"
            register={register}
            placeholder="Insira o número"
            inputType="number"
            error={errors.number?.message}
          />
          <InputField
            id="neighborhood"
            label="Bairro"
            register={register}
            placeholder="Insira o bairro"
            error={errors.neighborhood?.message}
          />
          <InputField
            id="countryId"
            label="Pais"
            type="select"
            error={errors.countryId?.message}
            selectOptions={countries.map(country => ({
              value: country.id.toString(),
              label: country.name,
            }))}
            register={register}
            onChange={e => {
              getStatesByCountry(Number(e.target.value));
              getCitiesByState();
              setValue('stateId', '');
              setValue('cityId', '');
            }}
          />
          <InputField
            id="stateId"
            label="Estado"
            type="select"
            error={errors.stateId?.message}
            selectOptions={states.map(state => ({
              value: state.id.toString(),
              label: state.name,
            }))}
            register={register}
            onChange={e => {
              getCitiesByState(Number(e.target.value));
              setValue('cityId', '');
            }}
          />
          <InputField
            id="cityId"
            label="Cidade"
            type="select"
            error={errors.cityId?.message}
            selectOptions={cities.map(city => ({
              value: city.id.toString(),
              label: city.name,
            }))}
            register={register}
          />
          <InputField
            id="complement"
            label="Complemento (opcional)"
            register={register}
            placeholder="Insira o complemento"
            error={errors.complement?.message}
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

export default ModalAddressCreate;
