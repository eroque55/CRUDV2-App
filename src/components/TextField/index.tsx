import { StyledTextField } from "./index.styles";
import Input from "./Input";
import Label from "./Label";
import ITextField from "@/src/@types/ITextField";

export default function TextField({
   children,
   value,
   placeholder,
   type,
   maxLength,
   required,
}: ITextField) {
   return (
      <StyledTextField>
         <Label>{children}</Label>
         <Input
            placeholder={placeholder}
            type={type}
            maxLength={maxLength}
            required={required}
         >
            {value}
         </Input>
      </StyledTextField>
   );
}
