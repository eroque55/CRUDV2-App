import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  CustomerSchema,
  ICustomerSchema,
} from '@/src/validations/CustomerCreateSchema';
import { AddressSchema, IAddressSchema } from '@/src/validations/AddressSchema';
import {
  confirmationModal,
  errorModal,
  successModal,
} from '@/src/utils/Toasts';
import { useCountries, useCountries2 } from '@/src/store/CountryStore';
import ICustomer from '@/src/interfaces/ICustomer';
import IPhone from '@/src/interfaces/IPhone';
import IAddress from '@/src/interfaces/IAddress';
import ICountry from '@/src/interfaces/ICountry';
import IState from '@/src/interfaces/IState';
import ICity from '@/src/interfaces/ICity';
import { createCustomer, getCustomers } from '@/src/services/Customer.service';
import useCustomerFilter from '@/src/hooks/useCustomerFilter';
import AddressStep from './AddressStep';
import CustomerStep from './CustomerStep';
import ModalForm from '../ModalForm';
import ModalHeader from '../ModalHeader';
import ModalFooter from '../ModalFooter';
import ModalBackground from '../ModalBackground';
import { ModalContainer } from '../Modal/styles';

interface Props {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}

const ModalCreateCustomer = ({ isOpen, setIsOpen }: Props) => {
  const { filter } = useCustomerFilter();
  const { refetch } = getCustomers(filter);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [step, setStep] = useState(0);
  const [customer, setCustomer] = useState<Partial<ICustomer>>({});
  const useBillingCountries = useCountries();
  const useDeliveryCountries = useCountries2();

  useEffect(() => {
    if (isSubmitting) {
      finalSubmit();
    }
  }, [customer]);

  const {
    register: customerRegister,
    handleSubmit: customerHandleSubmit,
    setValue: customeSetValue,
    reset: customerReset,
    formState: { errors: customerErrors },
  } = useForm<ICustomerSchema>({
    resolver: yupResolver(CustomerSchema),
    mode: 'onBlur',
  });

  const {
    register: billingAddressRegister,
    handleSubmit: billingAddressHandleSubmit,
    setValue: billingAddressSetValue,
    reset: billingAddressReset,
    formState: { errors: billingAddressErrors },
  } = useForm<IAddressSchema>({
    resolver: yupResolver(AddressSchema),
    mode: 'onBlur',
    defaultValues: {
      addressType: 'COBRANCA',
    },
  });

  const {
    register: deliveryAddressRegister,
    handleSubmit: deliveryAddressHandleSubmit,
    setValue: deliveryAddressSetValue,
    reset: deliveryAddressReset,
    formState: { errors: deliveryAddressErrors },
  } = useForm<IAddressSchema>({
    resolver: yupResolver(AddressSchema),
    mode: 'onBlur',
    defaultValues: {
      addressType: 'ENTREGA',
    },
  });

  const stepName = [
    'Dados pessoais',
    'Endereço de cobrança',
    'Endereço de entrega',
  ];

  const backButtonName = ['Cancelar', 'Voltar', 'Voltar'];
  const confirmButtonName = ['Próximo', 'Próximo', 'Cadastrar'];

  const onSubmit = () => {
    {
      step === 0 && customerHandleSubmit(submitCustomerStep)();
    }
    {
      step === 1 && billingAddressHandleSubmit(submitBillingAddressStep)();
    }
    {
      step === 2 && deliveryAddressHandleSubmit(submitDeliveryAddressStep)();
    }
  };

  const onCancel = () => {
    {
      step === 0 &&
        confirmationModal({
          title: 'Cancelar cadastro',
          message: 'Deseja realmente cancelar o cadastro?',
          confirmAction: () => {
            setIsOpen(false);
            customerReset();
            billingAddressReset();
            deliveryAddressReset();
          },
          cancelButton: 'Voltar',
          confirmButton: 'Cancelar',
        });
    }
    {
      step !== 0 && setStep(step - 1);
    }
  };

  const submitCustomerStep = async (data: ICustomerSchema) => {
    const phone: Partial<IPhone> = {
      ddd: data.number.substring(0, 2),
      number: data.number.substring(2),
      phoneType: data.phoneType as 'RESIDENCIAL' | 'CELULAR' | 'COMERCIAL',
    };

    await setCustomer(() => ({
      name: data.name,
      birthDate: data.birthDate,
      cpf: data.cpf,
      gender: data.gender as 'MASCULINO' | 'FEMININO' | 'OUTRO',
      email: data.email,
      password: data.password,
      confPassword: data.confPassword,
      phone: phone as IPhone,
    }));
    setStep(step + 1);
  };

  const submitBillingAddressStep = (data: IAddressSchema) => {
    const billingAddress: Partial<IAddress> = {};

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

    billingAddress.addressType = 'COBRANCA';
    billingAddress.nickname = data.nickname;
    billingAddress.cep = data.cep;
    billingAddress.residenceType = data.residenceType as
      | 'CASA'
      | 'APARTAMENTO'
      | 'OUTRO';
    billingAddress.streetType = data.streetType as
      | 'OUTRO'
      | 'RUA'
      | 'AVENIDA'
      | 'TRAVESSA'
      | 'ALAMEDA'
      | 'ESTRADA';
    billingAddress.street = data.street;
    billingAddress.number = data.number;
    billingAddress.neighborhood = data.neighborhood;
    billingAddress.city = city as ICity;
    billingAddress.complement = data.complement;

    setCustomer(prevCustomer => ({
      ...prevCustomer,
      addresses: [billingAddress as IAddress],
    }));

    setStep(step + 1);
  };
  const submitDeliveryAddressStep = (data: IAddressSchema) => {
    const deliveryAddress: Partial<IAddress> = {};

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

    deliveryAddress.addressType = 'ENTREGA';
    deliveryAddress.nickname = data.nickname;
    deliveryAddress.cep = data.cep;
    deliveryAddress.residenceType = data.residenceType as
      | 'CASA'
      | 'APARTAMENTO'
      | 'OUTRO';
    deliveryAddress.streetType = data.streetType as
      | 'OUTRO'
      | 'RUA'
      | 'AVENIDA'
      | 'TRAVESSA'
      | 'ALAMEDA'
      | 'ESTRADA';
    deliveryAddress.street = data.street;
    deliveryAddress.number = data.number;
    deliveryAddress.neighborhood = data.neighborhood;
    deliveryAddress.city = city as ICity;
    deliveryAddress.complement = data.complement;

    setCustomer(prevCustomer => ({
      ...prevCustomer,
      addresses: [
        ...(prevCustomer.addresses || []),
        deliveryAddress as IAddress,
      ],
    }));

    setIsSubmitting(true);
  };

  const finalSubmit = async () => {
    try {
      await createCustomer(customer as ICustomer);
      successModal('Cliente cadastrado com sucesso!');
      setIsOpen(false);
      await refetch();
      setStep(0);
      customerReset();
      billingAddressReset();
      deliveryAddressReset();
    } catch (error: any) {
      errorModal(error.response.data);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <ModalBackground>
      <ModalContainer $width="40rem">
        <ModalHeader>
          Cadastrar Cliente {step + 1}/3 - {stepName[step]}
        </ModalHeader>
        <ModalForm>
          {step === 0 && (
            <CustomerStep
              register={customerRegister}
              errors={customerErrors}
              setValue={customeSetValue}
            />
          )}
          {step === 1 && (
            <AddressStep
              register={billingAddressRegister}
              errors={billingAddressErrors}
              setValue={billingAddressSetValue}
              useCountries={useBillingCountries}
            />
          )}
          {step === 2 && (
            <AddressStep
              register={deliveryAddressRegister}
              errors={deliveryAddressErrors}
              setValue={deliveryAddressSetValue}
              useCountries={useDeliveryCountries}
            />
          )}
        </ModalForm>
        <ModalFooter
          confirmButtonType="submit"
          cancelButton={backButtonName[step]}
          confirmAction={onSubmit}
          cancelAction={onCancel}
        >
          {confirmButtonName[step]}
        </ModalFooter>
      </ModalContainer>
    </ModalBackground>
  );
};

export default ModalCreateCustomer;
