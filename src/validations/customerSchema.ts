import * as yup from "yup";

export type ICustomerSchema = yup.InferType<typeof customerSchema>;

export const customerSchema = yup.object().shape({
   name: yup
      .string()
      .required("Nome é obrigatório")
      .min(3, "Nome deve ter pelo menos 3 caracteres")
      .max(50, "Nome pode ter no máximo 50 caracteres")
      .matches(/^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/, "Nome deve conter apenas letras"),

   birthDate: yup
      .date()
      .nullable()
      .typeError("Data de nascimento inválida")
      .required("Data de nascimento é obrigatória")
      .min(new Date("1925-01-01"), "Data de nascimento muito antiga")
      .max(new Date(), "Data de nascimento não pode estar no futuro"),

   cpf: yup
      .string()
      .required("CPF é obrigatório")
      .matches(/^\d{11}$/, "CPF deve ter 11 números")
      .test("valid-cpf", "CPF inválido", (value) => validarCPF(value)),

   gender: yup
      .string()
      .required("Gênero é obrigatório")
      .oneOf(["MASCULINO", "FEMININO", "OUTRO"], "Gênero inválido"),

   email: yup
      .string()
      .required("E-mail é obrigatório")
      .email("E-mail inválido"),

   password: yup
      .string()
      .required("Senha é obrigatória")
      .min(8, "Senha deve ter pelo menos 8 caracteres")
      .matches(/[A-Z]/, "Senha deve conter pelo menos uma letra maiúscula")
      .matches(/[a-z]/, "Senha deve conter pelo menos uma letra minúscula")
      .matches(
         /[!@#$%^&*(),.?":{}|<>]/,
         "Senha deve conter pelo menos um caractere especial"
      ),

   confPassword: yup
      .string()
      .required("Confirmação de senha é obrigatória")
      .oneOf([yup.ref("password")], "As senhas não coincidem"),

   ranking: yup
      .number()
      .typeError("Ranking invalido")
      .required("Ranking é obrigatório")
      .integer("Ranking deve ser um número inteiro")
      .min(1, "Ranking deve ser pelo menos 1")
      .max(10, "Ranking pode ser no máximo 10")
      .default(1),

   number: yup
      .string()
      .required("Número de telefone é obrigatório")
      .matches(/^\d{10,11}$/, "Número de telefone inválido"),

   phoneType: yup
      .string()
      .required("Tipo de telefone é obrigatório")
      .oneOf(
         ["CELULAR", "RESIDENCIAL", "COMERCIAL", "OUTRO"],
         "Tipo de telefone inválido"
      ),
});

function validarCPF(cpf: string | undefined): boolean {
   if (!cpf) return false;

   cpf = cpf.replace(/\D/g, "");

   if (cpf.length !== 11) return false;

   if (/^(\d)\1+$/.test(cpf)) return false;

   let sum = 0,
      remainder;
   for (let i = 1; i <= 9; i++) sum += parseInt(cpf[i - 1]) * (11 - i);
   remainder = (sum * 10) % 11;
   if (remainder === 10 || remainder === 11) remainder = 0;
   if (remainder !== parseInt(cpf[9])) return false;

   sum = 0;
   for (let i = 1; i <= 10; i++) sum += parseInt(cpf[i - 1]) * (12 - i);
   remainder = (sum * 10) % 11;
   if (remainder === 10 || remainder === 11) remainder = 0;
   if (remainder !== parseInt(cpf[10])) return false;

   return true;
}
