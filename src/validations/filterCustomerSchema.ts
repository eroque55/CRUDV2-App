import * as yup from "yup";

export type IFilterCustomerSchema = yup.InferType<typeof filterCustomerSchema>;

export const filterCustomerSchema = yup.object().shape({
   name: yup.string().optional(),

   birthDate: yup.date().optional().nullable(),

   cpf: yup.string().optional(),

   gender: yup.string().optional(),

   email: yup.string().optional(),

   ranking: yup.string().optional(),

   status: yup.string().optional(),
});
