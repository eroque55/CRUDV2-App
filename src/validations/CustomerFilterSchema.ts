import * as yup from 'yup';

export type ICustomerFilterSchema = yup.InferType<typeof CustomerFilterSchema>;

export const CustomerFilterSchema = yup.object().shape({
  name: yup.string().optional(),

  birthDate: yup.date().optional().nullable(),

  cpf: yup.string().optional(),

  gender: yup.string().optional(),

  email: yup.string().optional(),

  ranking: yup.string().optional(),

  status: yup.string().optional(),
});
