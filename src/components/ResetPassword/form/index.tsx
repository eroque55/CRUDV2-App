import { FieldErrors, UseFormRegister, UseFormSetValue } from "react-hook-form";
import { StyledModalForm } from "@/src/components/Modalzz/modal.styles";
import {
   StyledField,
   StyledInput,
   StyledLabel,
   StyledErrorSpan,
   StyledFieldTitle,
} from "@/src/components/Fields/index.styles";
import { IResetPasswordSchema } from "@/src/validations/resetPasswordSchema";

interface Props {
   register: UseFormRegister<IResetPasswordSchema>;
   errors: FieldErrors<IResetPasswordSchema>;
}

export default function ResetPasswordForm({ register, errors }: Props) {
   return (
      <StyledModalForm>
         <StyledField>
            <StyledFieldTitle>
               <StyledLabel>Senha atual</StyledLabel>
               {errors.lastPassword && (
                  <StyledErrorSpan>
                     {errors.lastPassword.message}
                  </StyledErrorSpan>
               )}
            </StyledFieldTitle>
            <StyledInput type="password" {...register("lastPassword")} />
         </StyledField>

         <StyledField>
            <StyledFieldTitle>
               <StyledLabel>Nova senha</StyledLabel>
               {errors.newPassword && (
                  <StyledErrorSpan>
                     {errors.newPassword.message}
                  </StyledErrorSpan>
               )}
            </StyledFieldTitle>
            <StyledInput type="password" {...register("newPassword")} />
         </StyledField>

         <StyledField>
            <StyledFieldTitle>
               <StyledLabel>Confirme a nova senha</StyledLabel>
               {errors.confNewPassword && (
                  <StyledErrorSpan>
                     {errors.confNewPassword.message}
                  </StyledErrorSpan>
               )}
            </StyledFieldTitle>
            <StyledInput type="password" {...register("confNewPassword")} />
         </StyledField>
      </StyledModalForm>
   );
}
