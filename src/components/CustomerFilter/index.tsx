import { useForm } from "react-hook-form";
import {
   StyledFilterContainer,
   StyledFilterTitle,
   StyledFilterButtonsContainer,
   StyledFilterClear,
   StyledFilterForm,
   StyledFilterField,
   SyledFilterHeader,
} from "./styles";

import {
   StyledLabel,
   StyledInput,
   StyledSelect,
   StyledInputMask,
   StyledRadioContainer,
} from "@/src/components/Fields/styles";

import {
   filterCustomerSchema,
   IFilterCustomerSchema,
} from "@/src/validations/filterCustomerSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import ICustomer from "@/src/interfaces/ICustomer";
import {
   useCustomerStore,
   useFilterModalStore,
} from "@/src/store/CustomerListingStore";
import ModalBackground from "../ModalBackground";
import CloseButton from "../CloseButton";
import ButtonComponent from "../Button";

export default function CustomerFilter() {
   const { fetchCustomers } = useCustomerStore();
   const { filterIsOpen, filterCloseModal } = useFilterModalStore();
   const { register, handleSubmit, reset, setValue } =
      useForm<IFilterCustomerSchema>({
         resolver: yupResolver(filterCustomerSchema),
         mode: "onBlur",
         defaultValues: {
            status: "",
            birthDate: "",
         },
      });

   const onSubmit = async (data: IFilterCustomerSchema) => {
      const customerFilter: Partial<ICustomer> = {
         name: data.name,
         cpf: data.cpf,
         email: data.email,
      };

      if (data.birthDate) {
         customerFilter.birthDate = new Date(data.birthDate);
      }

      if (data.ranking) {
         customerFilter.ranking = parseInt(data.ranking);
      }

      if (data.status) {
         customerFilter.status = data.status === "true";
      }

      if (data.gender) {
         customerFilter.gender = data.gender as
            | "FEMININO"
            | "MASCULINO"
            | "OUTRO";
      }

      await fetchCustomers(customerFilter as ICustomer);
   };

   const handleReset = async () => {
      setValue("cpf", "");
      reset();
      await fetchCustomers();
   };

   if (!filterIsOpen) {
      return null;
   }

   return (
      <ModalBackground align="left">
         <StyledFilterContainer>
            <SyledFilterHeader>
               <StyledFilterTitle>Filtrar clientes</StyledFilterTitle>
               <CloseButton onClick={filterCloseModal} />
            </SyledFilterHeader>
            <StyledFilterForm>
               <StyledFilterField>
                  <StyledLabel>Nome</StyledLabel>
                  <StyledInput type="text" {...register("name")} />
               </StyledFilterField>
               <StyledFilterField>
                  <StyledLabel>CPF</StyledLabel>
                  <StyledInputMask
                     mask="000.000.000-00"
                     onAccept={(value) => {
                        setValue("cpf", value.replace(/[-.]/g, ""), {
                           shouldValidate: true,
                        });
                     }}
                     {...register("cpf")}
                  />
               </StyledFilterField>
               <StyledFilterField>
                  <StyledLabel>E-mail</StyledLabel>
                  <StyledInput type="text" {...register("email")} />
               </StyledFilterField>
               <StyledFilterField>
                  <StyledLabel>Data de nascimento</StyledLabel>
                  <StyledInput type="date" {...register("birthDate")} />
               </StyledFilterField>
               <StyledFilterField>
                  <StyledLabel>Gênero</StyledLabel>
                  <StyledSelect {...register("gender")}>
                     <option value="">Selecione</option>
                     <option value="FEMININO">Feminino</option>
                     <option value="MASCULINO">Masculino</option>
                     <option value="OUTRO">Outro</option>
                  </StyledSelect>
               </StyledFilterField>
               <StyledFilterField>
                  <StyledLabel>Status</StyledLabel>
                  <StyledRadioContainer>
                     <input
                        type="radio"
                        id="ativo"
                        value={"true"}
                        {...register("status")}
                     />
                     <StyledLabel htmlFor="ativo">Ativo</StyledLabel>
                  </StyledRadioContainer>
                  <StyledRadioContainer>
                     <input
                        type="radio"
                        id="inativo"
                        value={"false"}
                        {...register("status")}
                     />
                     <StyledLabel htmlFor="inativo">Inativo</StyledLabel>
                  </StyledRadioContainer>
               </StyledFilterField>
               <StyledFilterField>
                  <StyledLabel>Ranking</StyledLabel>
                  <StyledInput type="number" {...register("ranking")} />
               </StyledFilterField>
            </StyledFilterForm>
            <StyledFilterButtonsContainer>
               <ButtonComponent onClick={handleSubmit(onSubmit)}>
                  Filtrar
               </ButtonComponent>
               <StyledFilterClear onClick={handleReset}>
                  Limpar
               </StyledFilterClear>
            </StyledFilterButtonsContainer>
         </StyledFilterContainer>
      </ModalBackground>
   );
}
