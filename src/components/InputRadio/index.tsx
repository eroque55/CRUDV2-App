import { UseFormRegister } from "react-hook-form";
import InputLabel from "../InputLabel";
import { InputRadioContent } from "./styles";

export interface RadioProps {
   id: string;
   label: string;
   value: string;
}

interface Props {
   register: UseFormRegister<any>;
   radios: RadioProps[];
   registerId: string;
}

const InputRadio = ({ register, radios, registerId }: Props) => {
   return radios.map(({ id, label, value }) => (
      <InputRadioContent key={id}>
         <input type="radio" id={id} value={value} {...register(registerId)} />
         <InputLabel htmlFor={id}>{label}</InputLabel>
      </InputRadioContent>
   ));
};

export default InputRadio;
