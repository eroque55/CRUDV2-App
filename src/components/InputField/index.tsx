import { UseFormRegister } from "react-hook-form";
import { FieldContent, FieldHeaderContent } from "./styles";
import InputLabel from "../InputLabel";
import InputError from "../InputError";
import Input from "../Input";
import { InputMask } from "../InputMask";
import InputSelect, { OptionProps } from "../InputSelect";
import InputRadio, { RadioProps } from "../InputRadio";
import InputPassword from "../InputPassword";

interface Props {
   id: string;
   label: string;
   placeholder?: string;
   register: UseFormRegister<any>;
   error?: string;
   type?: "input" | "maskedInput" | "select" | "radio" | "password";
   inputType?: "text" | "email" | "date" | "number";
   mask?: string;
   onAccept?: (value: string) => void;
   selectOptions?: OptionProps[];
   radioOptions?: RadioProps[];
}

const InputField = ({
   id,
   label,
   register,
   error,
   placeholder,
   type = "input",
   inputType,
   mask,
   onAccept,
   selectOptions = [],
   radioOptions = [],
}: Props) => {
   return (
      <FieldContent>
         <FieldHeaderContent>
            <InputLabel htmlFor={id}>{label}</InputLabel>
            <InputError>{error}</InputError>
         </FieldHeaderContent>
         {type === "input" && (
            <Input
               type={inputType}
               id={id}
               placeholder={placeholder}
               {...register(id)}
            />
         )}
         {type === "maskedInput" && (
            <InputMask
               mask={mask}
               id={id}
               placeholder={placeholder}
               onAccept={onAccept}
               {...register(id)}
            />
         )}
         {type === "select" && (
            <InputSelect id={id} {...register(id)}>
               <option value="">Selecione</option>
               {selectOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                     {option.label}
                  </option>
               ))}
            </InputSelect>
         )}
         {type === "radio" && (
            <InputRadio
               register={register}
               radios={radioOptions}
               registerId={id}
            />
         )}
         {type === "password" && (
            <InputPassword
               id={id}
               placeholder={placeholder}
               register={register}
            />
         )}
      </FieldContent>
   );
};

export default InputField;
