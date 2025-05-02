import * as yup from 'yup';

export type ILoginSchema = yup.InferType<typeof LoginSchema>;

export const LoginSchema = yup.object().shape({
  email: yup.string().required('E-mail é obrigatório').email('E-mail inválido'),

  password: yup
    .string()
    .required('Senha é obrigatória')
    .min(8, 'Senha deve ter pelo menos 8 caracteres')
    .matches(/[A-Z]/, 'Senha deve conter pelo menos uma letra maiúscula')
    .matches(/[a-z]/, 'Senha deve conter pelo menos uma letra minúscula')
    .matches(
      /[!@#$%^&*(),.?":{}|<>]/,
      'Senha deve conter pelo menos um caractere especial',
    ),
});
