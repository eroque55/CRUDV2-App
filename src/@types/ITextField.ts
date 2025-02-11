import { FieldErrors, UseFormRegister } from "react-hook-form";
import { ICustomerSchema } from "../validations/customerSchema";

interface ITextField {
   children: React.ReactNode;
   value?: string;
   placeholder: string;
   type?: string;
   required?: boolean;
   maxLength?: number;
   registerName:
      | "nome"
      | "dataNascimento"
      | "cpf"
      | "genero"
      | "email"
      | "senha"
      | "confirmaSenha"
      | "ranking"
      | "ddd"
      | "numeroTelefone"
      | "tipoTelefone";
   register?: UseFormRegister<ICustomerSchema>;
   errors: FieldErrors<ICustomerSchema>;
}

export default ITextField;
