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
import { IUpdateCustomerSchema } from "@/src/validations/updateCustomerSchema";
import { useCustomerState } from "@/src/store/CustomerDetailsStore";
import { useEffect } from "react";

interface Props {
   register: UseFormRegister<IUpdateCustomerSchema>;
   errors: FieldErrors<IUpdateCustomerSchema>;
   setValue: UseFormSetValue<IUpdateCustomerSchema>;
}

export default function CustomerForm({ register, errors, setValue }: Props) {
   const { customer } = useCustomerState();

   useEffect(() => {
      setValue("number", phone);
      setValue("cpf", cpf);
   }, []);

   const phone = (customer?.phone.ddd ?? "") + (customer?.phone.number ?? "");

   const cpf = customer?.cpf || "";

   return (
      <StyledModalForm>
         <StyledField>
            <StyledFieldTitle>
               <StyledLabel>Nome</StyledLabel>
               {errors.name && (
                  <StyledErrorSpan>{errors.name.message}</StyledErrorSpan>
               )}
            </StyledFieldTitle>
            <StyledInput defaultValue={customer?.name} {...register("name")} />
         </StyledField>

         <StyledField>
            <StyledFieldTitle>
               <StyledLabel>Data de nascimento</StyledLabel>
               {errors.birthDate && (
                  <StyledErrorSpan>{errors.birthDate.message}</StyledErrorSpan>
               )}
            </StyledFieldTitle>
            <StyledInput
               type="date"
               defaultValue={customer?.birthDate.toString().split("T")[0]}
               {...register("birthDate")}
            />
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
               defaultValue={customer?.cpf}
               onAccept={(value) => {
                  setValue("cpf", value.replace(/[-.]/g, ""), {
                     shouldValidate: true,
                  });
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
            <StyledSelect
               defaultValue={customer?.gender}
               {...register("gender")}
            >
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
            <StyledInput
               defaultValue={customer?.email}
               type="email"
               {...register("email")}
            />
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
               defaultValue={customer?.ranking}
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
               defaultValue={phone}
               mask="(00) 00000-0000"
               onAccept={(value) => {
                  setValue("number", value.replace(/[()-/ ]/g, ""), {
                     shouldValidate: true,
                  });
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
            <StyledSelect
               defaultValue={customer?.phone.phoneType}
               {...register("phoneType")}
            >
               <option value="CELULAR">Celular</option>
               <option value="RESIDENCIAL">Residencial</option>
               <option value="COMERCIAL">Comercial</option>
            </StyledSelect>
         </StyledField>
      </StyledModalForm>
   );
}
