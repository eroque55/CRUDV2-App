import { FieldErrors, UseFormRegister, UseFormSetValue } from "react-hook-form";
import { StyledModalForm } from "@/src/components/Modalzz/modal.styles";
import {
   StyledField,
   StyledInput,
   StyledLabel,
   StyledSelect,
   StyledErrorSpan,
   StyledFieldTitle,
   StyledInputMask,
} from "@/src/components/Fields/index.styles";
import { ICardSchema } from "@/src/validations/cardSchema";

interface Props {
   register: UseFormRegister<ICardSchema>;
   errors: FieldErrors<ICardSchema>;
   setValue: UseFormSetValue<ICardSchema>;
}

export default function CardForm({ register, errors, setValue }: Props) {
   return (
      <StyledModalForm>
         <StyledField>
            <StyledFieldTitle>
               <StyledLabel>Número do cartão</StyledLabel>
               {errors.number && (
                  <StyledErrorSpan>{errors.number.message}</StyledErrorSpan>
               )}
            </StyledFieldTitle>
            <StyledInputMask
               mask="0000 0000 0000 0000"
               onAccept={(value) => {
                  setValue("number", value.replace(/[\ ]/g, ""));
               }}
               {...register("number")}
            />
         </StyledField>

         <StyledField>
            <StyledFieldTitle>
               <StyledLabel>Vencimento</StyledLabel>
               {errors.expirationDate && (
                  <StyledErrorSpan>
                     {errors.expirationDate.message}
                  </StyledErrorSpan>
               )}
            </StyledFieldTitle>
            <StyledInputMask
               mask="00/00"
               onAccept={(value) => {
                  setValue("expirationDate", value.replace(/[\/]/g, ""));
               }}
               {...register("expirationDate")}
            />
         </StyledField>

         <StyledField>
            <StyledFieldTitle>
               <StyledLabel>Nome do titular</StyledLabel>
               {errors.cardholder && (
                  <StyledErrorSpan>{errors.cardholder.message}</StyledErrorSpan>
               )}
            </StyledFieldTitle>
            <StyledInput {...register("cardholder")} />
         </StyledField>

         <StyledField>
            <StyledFieldTitle>
               <StyledLabel>Código de segurança</StyledLabel>
               {errors.cvv && (
                  <StyledErrorSpan>{errors.cvv.message}</StyledErrorSpan>
               )}
            </StyledFieldTitle>
            <StyledInputMask
               mask="000"
               onAccept={(value) => {
                  setValue("cvv", value);
               }}
               {...register("cvv")}
            />
         </StyledField>

         <StyledField>
            <StyledFieldTitle>
               <StyledLabel>Bandeira do cartão</StyledLabel>
               {errors.cardBrand && (
                  <StyledErrorSpan>{errors.cardBrand.message}</StyledErrorSpan>
               )}
            </StyledFieldTitle>
            <StyledSelect {...register("cardBrand")}>
               <option value="VISA">Visa</option>
               <option value="MASTERCARD">Mastercard</option>
               <option value="AMERICAN_EXPRESS">American Express</option>
               <option value="DISCOVER">Discover</option>
               <option value="DINERS_CLUB">Diners Club</option>
               <option value="JCB">JCB</option>
               <option value="OUTRA">Outra</option>
            </StyledSelect>
         </StyledField>
      </StyledModalForm>
   );
}
