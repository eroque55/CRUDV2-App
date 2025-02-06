import TextField from "@/src/components/TextField";
import { StyledModalForm } from "./index.styles";
import ITextField from "@/src/@types/ITextField";

interface Props {
   fields: ITextField[];
}

export default function ModalForm({ fields }: Props) {
   return (
      <StyledModalForm>
         {fields.map((field) => (
            <TextField
               key={field.children?.toString()}
               value={field.value}
               placeholder={field.placeholder}
               type={field.type}
               required={field.required}
               maxLength={field.maxLength}
            >
               {field.children}
            </TextField>
         ))}
      </StyledModalForm>
   );
}
