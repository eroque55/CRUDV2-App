import * as yup from "yup";

export type IAddressSchema = yup.InferType<typeof AddressSchema>;

export const AddressSchema = yup.object().shape({
   nickname: yup
      .string()
      .required("Apelido é obrigatório")
      .min(3, "Apelido deve ter pelo menos 3 caracteres")
      .max(50, "Apelido pode ter no máximo 50 caracteres")
      .matches(/^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/, "Apelido deve conter apenas letras"),

   cep: yup
      .string()
      .required("CEP é obrigatório")
      .matches(/^\d{8}$/, "CEP deve ter 8 números"),

   addressType: yup
      .string()
      .required("Tipo de endereço é obrigatório")
      .oneOf(
         ["", "RESIDENCIAL", "COBRANCA", "ENTREGA"],
         "Tipo de endereço inválido"
      ),

   residenceType: yup
      .string()
      .required("Tipo de residência é obrigatório")
      .oneOf(
         ["", "CASA", "APARTAMENTO", "OUTRO"],
         "Tipo de residência inválido"
      ),

   streetType: yup
      .string()
      .required("Tipo de logradouro é obrigatório")
      .oneOf(
         ["", "RUA", "AVENIDA", "TRAVESSA", "ALAMEDA", "ESTRADA", "OUTRO"],
         "Tipo de rua inválido"
      ),

   street: yup
      .string()
      .required("Logradouro é obrigatório")
      .min(3, "Logradouro deve ter pelo menos 3 caracteres")
      .max(50, "Logradouro pode ter no máximo 50 caracteres"),

   number: yup
      .number()
      .typeError("Número inválido")
      .required("Número é obrigatório")
      .integer("Número deve ser um número inteiro")
      .positive("Número deve ser positivo")
      .max(99999, "Número pode ter no máximo 5 dígitos"),

   neighborhood: yup
      .string()
      .required("Bairro é obrigatório")
      .min(3, "Bairro deve ter pelo menos 3 caracteres")
      .max(50, "Bairro pode ter no máximo 50 caracteres"),

   countryId: yup.string().required("País é obrigatório"),

   stateId: yup.string().required("Estado é obrigatório"),

   cityId: yup.string().required("Cidade é obrigatória"),

   complement: yup
      .string()
      .max(100, "Complemento pode ter no máximo 100 caracteres"),
});
