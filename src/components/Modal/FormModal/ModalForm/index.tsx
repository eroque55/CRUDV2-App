import TextField from "@/src/components/TextField";
import { StyledModalForm } from "./index.styles";
import ITextField from "@/src/@types/ITextField";
import { FieldValues, useForm, UseFormRegister } from "react-hook-form";

interface Props {
   fields: ITextField[];
   register: UseFormRegister<FieldValues>;
}

export default function ModalForm({ fields, register }: Props) {
   // const { register } = useForm();

   return (
      <StyledModalForm>
         {fields.map((field) => (
            <TextField
               registerName={field.registerName}
               key={field.children?.toString()}
               value={field.value}
               placeholder={field.placeholder}
               type={field.type}
               required={field.required}
               maxLength={field.maxLength}
               register={register}
            >
               {field.children}
            </TextField>
         ))}
      </StyledModalForm>
   );
}
