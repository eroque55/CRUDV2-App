import * as yup from "yup";

export type IAddressUpdateSchema = yup.InferType<typeof AddressUpdateSchema>;

export const AddressUpdateSchema = yup.object().shape({
   nickname: yup
      .string()
      .min(3, "Apelido deve ter pelo menos 3 caracteres")
      .max(50, "Apelido pode ter no máximo 50 caracteres")
      .matches(/^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/, "Apelido deve conter apenas letras"),

   cep: yup.string().matches(/^\d{8}$/, "CEP deve ter 8 números"),

   residenceType: yup
      .string()
      .oneOf(
         ["", "CASA", "APARTAMENTO", "OUTRO"],
         "Tipo de residência inválido"
      ),

   streetType: yup
      .string()
      .oneOf(
         ["", "RUA", "AVENIDA", "TRAVESSA", "ALAMEDA", "ESTRADA", "OUTRO"],
         "Tipo de rua inválido"
      ),

   street: yup
      .string()
      .min(3, "Logradouro deve ter pelo menos 3 caracteres")
      .max(50, "Logradouro pode ter no máximo 50 caracteres"),

   number: yup
      .number()
      .typeError("Número inválido")
      .integer("Número deve ser um número inteiro")
      .positive("Número deve ser positivo")
      .max(99999, "Número pode ter no máximo 5 dígitos"),

   neighborhood: yup
      .string()
      .min(3, "Bairro deve ter pelo menos 3 caracteres")
      .max(50, "Bairro pode ter no máximo 50 caracteres"),

   countryId: yup.string(),

   stateId: yup.string(),

   cityId: yup.string(),

   complement: yup
      .string()
      .max(100, "Complemento pode ter no máximo 100 caracteres"),
});
