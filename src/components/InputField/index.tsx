import { UseFormRegister } from 'react-hook-form';
import { ChangeEvent } from 'react';
import { FieldContent, FieldHeaderContent } from './styles';
import InputLabel from '../InputLabel';
import InputError from '../InputError';
import Input from '../Input';
import { InputMask } from '../InputMask';
import InputSelect, { OptionProps } from '../InputSelect';
import InputRadio, { RadioProps } from '../InputRadio';
import InputPassword from '../InputPassword';

interface Props {
  id: string;
  label: string;
  placeholder?: string;
  register: UseFormRegister<any>;
  error?: string;
  type?: 'input' | 'maskedInput' | 'select' | 'radio' | 'password';
  inputType?: 'text' | 'email' | 'date' | 'number';
  defaultValue?: string;
  mask?: string;
  disabled?: boolean;
  selectOptions?: OptionProps[];
  radioOptions?: RadioProps[];
  onAccept?: (value: string) => void;
  onChange?: (event: ChangeEvent<HTMLSelectElement>) => void;
}

const InputField = ({
  id,
  label,
  register,
  error,
  placeholder,
  type = 'input',
  inputType,
  mask,
  disabled = false,
  selectOptions = [],
  radioOptions = [],
  onAccept,
  onChange,
  defaultValue,
}: Props) => {
  if (type === 'radio' && radioOptions.length === 0) {
    throw new Error('Radio options are required');
  }

  if (type === 'maskedInput' && !mask) {
    throw new Error('Mask is required for masked input');
  }

  return (
    <FieldContent>
      <FieldHeaderContent>
        <InputLabel htmlFor={id}>{label}</InputLabel>
        <InputError>{error}</InputError>
      </FieldHeaderContent>
      {type === 'input' && (
        <Input
          type={inputType}
          id={id}
          placeholder={placeholder}
          defaultValue={defaultValue}
          disabled={disabled}
          {...register(id)}
        />
      )}
      {type === 'maskedInput' && (
        <InputMask
          mask={mask}
          id={id}
          placeholder={placeholder}
          defaultValue={defaultValue}
          onAccept={onAccept}
          disabled={disabled}
          {...register(id)}
        />
      )}
      {type === 'select' && (
        <InputSelect
          id={id}
          {...register(id)}
          onChange={onChange}
          defaultValue={defaultValue}
          disabled={disabled}
        >
          <option value="">Selecione</option>
          {selectOptions.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </InputSelect>
      )}
      {type === 'radio' && (
        <InputRadio
          register={register}
          radios={radioOptions}
          registerId={id}
          defaultValue={defaultValue}
        />
      )}
      {type === 'password' && (
        <InputPassword id={id} placeholder={placeholder} register={register} />
      )}
    </FieldContent>
  );
};

export default InputField;
