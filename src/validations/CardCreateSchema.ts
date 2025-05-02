import * as yup from 'yup';

export type ICardCreateSchema = yup.InferType<typeof CardCreateSchema>;

export const CardCreateSchema = yup.object().shape({
  number: yup
    .string()
    .required('Número do cartão é obrigatório')
    .matches(/^[0-9]{16}$/, 'Número do cartão deve ter 16 dígitos'),

  cardholder: yup
    .string()
    .required('Nome do titular é obrigatório')
    .max(50, 'Nome do titular pode ter no máximo 50 caracteres')
    .matches(
      /^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/,
      'Nome do titular deve conter apenas letras',
    ),

  cvv: yup
    .string()
    .required('CVV é obrigatório')
    .matches(/^[0-9]{3}$/, 'CVV deve ter 3 dígitos'),

  expirationDate: yup
    .string()
    .required('Data de validade é obrigatória')
    .matches(/^\d{4}$/, 'Data de validade deve estar no formato MM/AA'),

  cardBrand: yup
    .string()
    .required('Bandeira do cartão é obrigatória')
    .oneOf(
      [
        '',
        'VISA',
        'MASTERCARD',
        'AMERICAN_EXPRESS',
        'DISCOVER',
        'DINERS_CLUB',
        'JCB',
        'OUTRA',
      ],
      'Bandeira do cartão inválida',
    ),
});
