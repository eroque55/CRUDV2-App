import { FieldValues, UseFormRegister } from "react-hook-form";

interface ITextField {
   children: React.ReactNode;
   value?: string;
   placeholder: string;
   type?: string;
   required?: boolean;
   maxLength?: number;
   registerName: string;
   register?: UseFormRegister<FieldValues>;
}

export default ITextField;
