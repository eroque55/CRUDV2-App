import { FieldErrors, UseFormRegister, UseFormSetValue } from 'react-hook-form';

import { IAddressSchema } from '@/src/validations/AddressSchema';

import { CountriesState } from '@/src/store/CountryStore';
import InputField from '../../InputField';

interface Props {
  register: UseFormRegister<IAddressSchema>;
  errors: FieldErrors<IAddressSchema>;
  setValue: UseFormSetValue<IAddressSchema>;
  useCountries: CountriesState;
}

const AddressStep = ({ setValue, register, errors, useCountries }: Props) => {
  const { cities, countries, states, getCitiesByState, getStatesByCountry } =
    useCountries;

  return (
    <>
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
    </>
  );
};

export default AddressStep;
