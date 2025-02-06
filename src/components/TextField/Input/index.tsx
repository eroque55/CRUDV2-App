import { StyledInput } from "./index.styles";
import ITextField from "@/src/@types/ITextField";

export default function Input({
   placeholder,
   type = "text",
   children,
   required,
   maxLength,
}: ITextField) {
   return (
      <StyledInput
         placeholder={placeholder}
         type={type}
         required={required}
         maxLength={maxLength}
      >
         {children}
      </StyledInput>
   );
}
