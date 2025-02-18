import { FieldErrors, UseFormRegister, UseFormSetValue } from "react-hook-form";
import { StyledModalForm } from "@/src/components/commom/Modal/modal.styles";
import {
   StyledField,
   StyledInput,
   StyledLabel,
   StyledSelect,
   StyledErrorSpan,
   StyledFieldTitle,
   StyledInputMask,
} from "@/src/components/commom/Fields/index.styles";
import { ICustomerSchema } from "@/src/validations/customerSchema";

interface Props {
   register: UseFormRegister<ICustomerSchema>;
   errors: FieldErrors<ICustomerSchema>;
   setValue: UseFormSetValue<ICustomerSchema>;
}

export default function CustomerForm({ register, errors, setValue }: Props) {
   return (
      <StyledModalForm>
         <StyledField>
            <StyledFieldTitle>
               <StyledLabel>Nome</StyledLabel>
               {errors.name && (
                  <StyledErrorSpan>{errors.name.message}</StyledErrorSpan>
               )}
            </StyledFieldTitle>
            <StyledInput {...register("name")} />
         </StyledField>

         <StyledField>
            <StyledFieldTitle>
               <StyledLabel>Data de nascimento</StyledLabel>
               {errors.birthDate && (
                  <StyledErrorSpan>{errors.birthDate.message}</StyledErrorSpan>
               )}
            </StyledFieldTitle>
            <StyledInput type="date" {...register("birthDate")} />
         </StyledField>

         <StyledField>
            <StyledFieldTitle>
               <StyledLabel>CPF</StyledLabel>
               {errors.cpf && (
                  <StyledErrorSpan>{errors.cpf.message}</StyledErrorSpan>
               )}
            </StyledFieldTitle>
            <StyledInputMask
               mask="000.000.000-00"
               onAccept={(value) => {
                  setValue("cpf", value.replace(/[-.]/g, ""));
               }}
               {...register("cpf")}
            />
         </StyledField>

         <StyledField>
            <StyledFieldTitle>
               <StyledLabel>Gênero</StyledLabel>
               {errors.gender && (
                  <StyledErrorSpan>{errors.gender.message}</StyledErrorSpan>
               )}
            </StyledFieldTitle>
            <StyledSelect {...register("gender")}>
               <option value="MASCULINO">Masculino</option>
               <option value="FEMININO">Feminino</option>
               <option value="OUTRO">Outro</option>
            </StyledSelect>
         </StyledField>

         <StyledField>
            <StyledFieldTitle>
               <StyledLabel>E-mail</StyledLabel>
               {errors.email && (
                  <StyledErrorSpan>{errors.email.message}</StyledErrorSpan>
               )}
            </StyledFieldTitle>
            <StyledInput type="email" {...register("email")} />
         </StyledField>

         <StyledField>
            <StyledFieldTitle>
               <StyledLabel>Senha</StyledLabel>
               {errors.password && (
                  <StyledErrorSpan>{errors.password.message}</StyledErrorSpan>
               )}
            </StyledFieldTitle>
            <StyledInput type="password" {...register("password")} />
         </StyledField>

         <StyledField>
            <StyledFieldTitle>
               <StyledLabel>Confirme a senha</StyledLabel>
               {errors.confPassword && (
                  <StyledErrorSpan>
                     {errors.confPassword.message}
                  </StyledErrorSpan>
               )}
            </StyledFieldTitle>
            <StyledInput type="password" {...register("confPassword")} />
         </StyledField>

         <StyledField>
            <StyledFieldTitle>
               <StyledLabel>Ranking</StyledLabel>
               {errors.ranking && (
                  <StyledErrorSpan>{errors.ranking.message}</StyledErrorSpan>
               )}
            </StyledFieldTitle>
            <StyledInput
               type="number"
               defaultValue={1}
               {...register("ranking")}
            />
         </StyledField>

         <StyledField>
            <StyledFieldTitle>
               <StyledLabel>Número de telefone</StyledLabel>
               {errors.number && (
                  <StyledErrorSpan>{errors.number.message}</StyledErrorSpan>
               )}
            </StyledFieldTitle>
            <StyledInputMask
               mask="(00) 00000-0000"
               onAccept={(value) => {
                  setValue("number", value.replace(/[()-/ ]/g, ""));
               }}
               {...register("number")}
            />
         </StyledField>

         <StyledField>
            <StyledFieldTitle>
               <StyledLabel>Tipo de telefone</StyledLabel>
               {errors.phoneType && (
                  <StyledErrorSpan>{errors.phoneType.message}</StyledErrorSpan>
               )}
            </StyledFieldTitle>
            <StyledSelect {...register("phoneType")}>
               <option value="CELULAR">Celular</option>
               <option value="RESIDENCIAL">Residencial</option>
               <option value="COMERCIAL">Comercial</option>
            </StyledSelect>
         </StyledField>
      </StyledModalForm>
   );
}
