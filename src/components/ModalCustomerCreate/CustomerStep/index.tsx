import { FieldErrors, UseFormRegister, UseFormSetValue } from 'react-hook-form';
import { ICustomerSchema } from '@/src/validations/CustomerCreateSchema';
import InputField from '../../InputField';

interface Props {
  register: UseFormRegister<ICustomerSchema>;
  errors: FieldErrors<ICustomerSchema>;
  setValue: UseFormSetValue<ICustomerSchema>;
}

const CustomerStep = ({ register, errors, setValue }: Props) => {
  return (
    <>
      <InputField
        id="name"
        label="Nome"
        register={register}
        placeholder="Insira o nome"
        error={errors.name?.message}
      />

      <InputField
        id="birthDate"
        label="Data de nascimento"
        register={register}
        error={errors.birthDate?.message}
        inputType="date"
      />

      <InputField
        id="cpf"
        label="CPF"
        register={register}
        placeholder="Insira o CPF"
        error={errors.cpf?.message}
        type="maskedInput"
        mask="000.000.000-00"
        onAccept={value => {
          setValue('cpf', value.replace(/[-.]/g, ''));
        }}
      />

      <InputField
        id="gender"
        label="Gênero"
        type="select"
        register={register}
        selectOptions={[
          { value: 'MASCULINO', label: 'Masculino' },
          { value: 'FEMININO', label: 'Feminino' },
          { value: 'OUTRO', label: 'Outro' },
        ]}
        error={errors.gender?.message}
      />

      <InputField
        id="email"
        label="E-mail"
        register={register}
        placeholder="Insira o e-mail"
        error={errors.email?.message}
      />

      <InputField
        id="ranking"
        label="Ranking"
        inputType="number"
        register={register}
        placeholder="Insira o ranking"
        error={errors.ranking?.message}
      />

      <InputField
        id="number"
        label="Número do telefone"
        register={register}
        placeholder="Insira o número do telefone"
        error={errors.number?.message}
        type="maskedInput"
        mask="(00) 00000-0000"
        onAccept={value => {
          setValue('number', value.replace(/[()-/ ]/g, ''));
        }}
      />

      <InputField
        id="phoneType"
        label="Tipo de telefone"
        type="select"
        selectOptions={[
          {
            value: 'RESIDENCIAL',
            label: 'Residencial',
          },
          {
            value: 'CELULAR',
            label: 'Celular',
          },
          {
            value: 'COMERCIAL',
            label: 'Comercial',
          },
        ]}
        register={register}
        error={errors.phoneType?.message}
      />

      <InputField
        id="password"
        label="Senha"
        register={register}
        placeholder="Insira a senha"
        error={errors.password?.message}
        type="password"
      />

      <InputField
        id="confPassword"
        label="Confirme sua senha"
        register={register}
        placeholder="Confirme a senha"
        error={errors.confPassword?.message}
        type="password"
      />
    </>
  );
};

export default CustomerStep;
