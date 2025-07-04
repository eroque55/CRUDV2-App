import { useForm } from 'react-hook-form';
import {
  CustomerFilterSchema,
  ICustomerFilterSchema,
} from '@/src/validations/CustomerFilterSchema';
import { yupResolver } from '@hookform/resolvers/yup';
import ICustomer from '@/src/interfaces/ICustomer';
import { getCustomers } from '@/src/services/Customer.service';
import useCustomerFilter from '@/src/hooks/useCustomerFilter';
import {
  StyledFilterContainer,
  StyledFilterTitle,
  StyledFilterButtonsContainer,
  StyledFilterClear,
  StyledFilterForm,
  SyledFilterHeader,
} from './styles';

import ModalBackground from '../ModalBackground';
import CloseButton from '../CloseButton';
import ButtonComponent from '../Button';
import InputField from '../InputField';
import { Line } from '../Line';

interface Props {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}

const FilterCustomer = ({ isOpen, setIsOpen }: Props) => {
  const { filter, setFilter } = useCustomerFilter();
  const { refetch } = getCustomers(filter);
  const { register, handleSubmit, reset, setValue } =
    useForm<ICustomerFilterSchema>({
      resolver: yupResolver(CustomerFilterSchema),
      mode: 'onBlur',
      defaultValues: {
        status: '',
        birthDate: null,
      },
    });

  const onSubmit = async (data: ICustomerFilterSchema) => {
    const newFilter: Partial<ICustomer> = {};

    if (data.name) {
      newFilter.name = data.name;
    }
    if (data.email) {
      newFilter.email = data.email;
    }
    if (data.cpf) {
      newFilter.cpf = data.cpf;
    }
    if (data.ranking) {
      newFilter.ranking = Number(data.ranking);
    }
    if (data.birthDate) {
      newFilter.birthDate = data.birthDate;
    }
    if (data.status) {
      newFilter.status = data.status === 'true';
    }
    if (data.gender) {
      newFilter.gender = data.gender as 'FEMININO' | 'MASCULINO' | 'OUTRO';
    }

    setFilter(newFilter);

    await refetch();
  };

  const handleReset = async () => {
    setValue('cpf', '');
    reset();
    setFilter({});
    await refetch();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <ModalBackground $align="left">
      <StyledFilterContainer>
        <SyledFilterHeader>
          <StyledFilterTitle>Filtrar clientes</StyledFilterTitle>

          <CloseButton onClick={() => setIsOpen(false)} />
        </SyledFilterHeader>

        <StyledFilterForm>
          <InputField
            id="name"
            label="Nome"
            register={register}
            placeholder="Insira um nome"
          />

          <Line />

          <InputField
            id="cpf"
            label="CPF"
            mask="000.000.000-00"
            placeholder="Insira um CPF"
            register={register}
            type="maskedInput"
            onAccept={value => {
              setValue('cpf', value.replace(/[-.]/g, ''), {
                shouldValidate: true,
              });
            }}
          />

          <Line />

          <InputField
            id="email"
            label="E-mail"
            register={register}
            placeholder="Insira um e-mail"
            inputType="email"
          />

          <Line />

          <InputField
            id="birthDate"
            label="Data de nascimento"
            register={register}
            inputType="date"
          />

          <Line />

          <InputField
            id="gender"
            label="Gênero"
            type="select"
            selectOptions={[
              { value: 'FEMININO', label: 'Feminino' },
              { value: 'MASCULINO', label: 'Masculino' },
              { value: 'OUTRO', label: 'Outro' },
            ]}
            register={register}
          />

          <Line />

          <InputField
            id="status"
            label="Status"
            type="radio"
            radioOptions={[
              { id: 'active', label: 'Ativo', value: 'true' },
              { id: 'inactive', label: 'Inativo', value: 'false' },
            ]}
            register={register}
          />

          <Line />

          <InputField
            id="ranking"
            label="Ranking"
            placeholder="Insira um ranking"
            register={register}
            inputType="number"
          />

          <Line />
        </StyledFilterForm>

        <StyledFilterButtonsContainer>
          <ButtonComponent submit onClick={handleSubmit(onSubmit)}>
            Filtrar
          </ButtonComponent>

          <StyledFilterClear onClick={handleReset}>Limpar</StyledFilterClear>
        </StyledFilterButtonsContainer>
      </StyledFilterContainer>
    </ModalBackground>
  );
};

export default FilterCustomer;
