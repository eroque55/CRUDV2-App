import { StyledDialog } from "@/src/components/Modalzz/modal.styles";
import ModalHeader from "@/src/components/Modalzz/modalHeader";
import ModalFooter from "@/src/components/Modalzz/modalFooter";
import CustomerForm from "./form";
import {
   ICustomerSchema,
   customerSchema,
} from "@/src/validations/customerSchema";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Dispatch, SetStateAction } from "react";
import { Customer, Phone } from "@/src/interfaces/api";
import { Gender, PhoneType } from "@/src/interfaces/enums";

interface Props {
   setCustomer: Dispatch<SetStateAction<Partial<Customer>>>;
   modalNext: () => void;
   modalBack: () => void;
}

export default function CreateCustomerModal({
   setCustomer,
   modalBack,
   modalNext,
}: Props) {
   const {
      register,
      handleSubmit,
      setValue,
      formState: { errors },
   } = useForm<ICustomerSchema>({
      resolver: yupResolver(customerSchema),
      mode: "onBlur",
   });

   const onSubmit: SubmitHandler<ICustomerSchema> = async (data) => {
      const phone: Partial<Phone> = {
         ddd: data.number.substring(0, 2),
         number: data.number.substring(2),
         phoneType: data.phoneType as PhoneType,
      };

      setCustomer(() => ({
         id: 0,
         name: data.name,
         birthDate: data.birthDate,
         cpf: data.cpf,
         email: data.email,
         gender: data.gender as Gender,
         password: data.password,
         confPassword: data.confPassword,
         ranking: data.ranking,
         status: true,
         phone: phone as Phone,
      }));

      modalNext();
   };

   return (
      <StyledDialog>
         <ModalHeader>Cadastrar Cliente 1/3 - Dados pessoais</ModalHeader>
         <CustomerForm
            register={register}
            errors={errors}
            setValue={setValue}
         />
         <ModalFooter onCancel={modalBack} onSubmit={handleSubmit(onSubmit)}>
            Próximo
         </ModalFooter>
      </StyledDialog>
   );
}
