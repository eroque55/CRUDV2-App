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
   register,
   registerName,
}: ITextField) {
   return (
      <StyledTextField>
         <Label>{children}</Label>
         <Input
            registerName={registerName}
            placeholder={placeholder}
            type={type}
            maxLength={maxLength}
            required={required}
            register={register}
         >
            {value}
         </Input>
      </StyledTextField>
   );
}
