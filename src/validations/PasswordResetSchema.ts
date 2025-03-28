import * as yup from "yup";

export type IPasswordResetSchema = yup.InferType<typeof PasswordResetSchema>;

export const PasswordResetSchema = yup.object().shape({
   lastPassword: yup.string().required("Senha atual é obrigatória"),

   newPassword: yup
      .string()
      .required("Nova senha é obrigatória")
      .min(8, "Senha deve ter pelo menos 8 caracteres")
      .matches(/[A-Z]/, "Senha deve conter pelo menos uma letra maiúscula")
      .matches(/[a-z]/, "Senha deve conter pelo menos uma letra minúscula")
      .matches(
         /[!@#$%^&*(),.?":{}|<>]/,
         "Senha deve conter pelo menos um caractere especial"
      ),

   confNewPassword: yup
      .string()
      .required("Confirmação de senha é obrigatória")
      .oneOf([yup.ref("newPassword")], "As senhas não coincidem"),
});
