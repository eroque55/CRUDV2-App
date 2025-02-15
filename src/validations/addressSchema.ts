import * as yup from "yup";

export type IAddressSchema = yup.InferType<typeof addressSchema>;

export const addressSchema = yup.object().shape({
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
      .oneOf(
         ["RESIDENCIAL", "COBRANCA", "ENTREGA"],
         "Tipo de endereço inválido"
      ),

   residenceType: yup
      .string()
      .required("Tipo de residência é obrigatório")
      .oneOf(["CASA", "APARTAMENTO", "OUTRO"], "Tipo de residência inválido"),

   streetType: yup
      .string()
      .required("Tipo de logradouro é obrigatório")
      .oneOf(
         ["RUA", "AVENIDA", "TRAVESSA", "ALAMEDA", "ESTRADA", "OUTRO"],
         "Tipo de rua inválido"
      ),

   street: yup
      .string()
      .required("Logradouro é obrigatório")
      .min(3, "Logradouro deve ter pelo menos 3 caracteres")
      .max(50, "Logradouro pode ter no máximo 50 caracteres"),

   number: yup
      .number()
      .required("Número é obrigatório")
      .positive("Número deve ser positivo"),

   neighborhood: yup
      .string()
      .required("Bairro é obrigatório")
      .min(3, "Bairro deve ter pelo menos 3 caracteres")
      .max(50, "Bairro pode ter no máximo 50 caracteres"),

   countryId: yup.number().required("País é obrigatório"),

   stateId: yup.number().required("Estado é obrigatório"),

   cityId: yup.number().required("Cidade é obrigatória"),

   complement: yup
      .string()
      .max(100, "Complemento pode ter no máximo 100 caracteres"),
});
