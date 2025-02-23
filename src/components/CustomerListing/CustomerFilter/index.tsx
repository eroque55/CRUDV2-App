import { useForm } from "react-hook-form";
import {
   StyledFilterContainer,
   StyledOverlay,
   StyledFilterTitle,
   StyledFilterButtonsContainer,
   StyledFilterButton,
   StyledFilterClear,
   StyledFilterForm,
   StyledFilterField,
   SyledFilterHeader,
   StyledCloseButton,
} from "./index.styles";

import {
   StyledLabel,
   StyledInput,
   StyledSelect,
   StyledInputMask,
   StyledRadioContainer,
} from "@/src/components/Commom/Fields/index.styles";
import {
   filterCustomerSchema,
   IFilterCustomerSchema,
} from "@/src/validations/filterCustomerSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { Customer } from "@/src/@types/api";
import { Gender } from "@/src/@types/enums";
import {
   useCustomerStore,
   useFilterModalStore,
} from "@/src/store/CustomerListingStore";
import Image from "next/image";
import CloseIcon from "@/public/icons/CloseIcon.svg";

export default function CustomerFilter() {
   const { fetchCustomers } = useCustomerStore();
   const { filterIsOpen, filterCloseModal } = useFilterModalStore();
   const {
      register,
      handleSubmit,
      reset,
      setValue,
      formState: { errors },
   } = useForm<IFilterCustomerSchema>({
      resolver: yupResolver(filterCustomerSchema),
      mode: "onBlur",
      defaultValues: {
         status: "",
         birthDate: "",
      },
   });

   const onSubmit = async (data: IFilterCustomerSchema) => {
      const customerFilter: Partial<Customer> = {
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
         customerFilter.gender = data.gender as Gender;
      }

      await fetchCustomers(customerFilter as Customer);
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
      <StyledOverlay>
         <StyledFilterContainer>
            <SyledFilterHeader>
               <StyledFilterTitle>Filtrar clientes</StyledFilterTitle>
               <StyledCloseButton onClick={filterCloseModal}>
                  <Image
                     src={CloseIcon}
                     alt="Icone de fechar"
                     width={16}
                     height={16}
                  />
               </StyledCloseButton>
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
               <StyledFilterButton onClick={handleSubmit(onSubmit)}>
                  Filtrar
               </StyledFilterButton>
               <StyledFilterClear onClick={handleReset}>
                  Limpar
               </StyledFilterClear>
            </StyledFilterButtonsContainer>
         </StyledFilterContainer>
      </StyledOverlay>
   );
}
