import { StyledDialog } from "@/src/components/Commom/Modal/modal.styles";
import ModalHeader from "@/src/components/Commom/Modal/ModalHeader";
import ModalFooter from "@/src/components/Commom/Modal/ModalFooter";
import CustomerForm from "./Form";
import {
   ICustomerSchema,
   customerSchema,
} from "@/src/validations/customerSchema";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Dispatch, SetStateAction } from "react";
import { Customer, Phone } from "@/src/@types/api";
import { Gender, PhoneType } from "@/src/@types/enums";

interface Props {
   setCustomer: Dispatch<SetStateAction<Customer>>;
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
      const phone: Phone = {
         id: 0,
         ddd: data.number.substring(0, 2),
         number: data.number.substring(2),
         phoneType: data.phoneType as PhoneType,
      };

      setCustomer(() => ({
         id: 0,
         name: data.name,
         birthDate: data.birthDate,
         cpf: data.cpf,
         confPassword: data.confPassword,
         email: data.email,
         gender: data.gender as Gender,
         password: data.password,
         ranking: data.ranking,
         status: true,
         phones: [phone],
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
