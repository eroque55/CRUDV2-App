import { StyledDialog } from "@/src/components/commom/Modal/modal.styles";
import ModalHeader from "@/src/components/commom/Modal/ModalHeader";
import ModalFooter from "@/src/components/commom/Modal/ModalFooter";
import CustomerForm from "./Form";
import {
   ICustomerSchema,
   customerSchema,
} from "@/src/validations/customerSchema";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Dispatch, SetStateAction } from "react";
import ICustomer from "@/src/@types/ICustomer";
import IPhone from "@/src/@types/IPhone";

interface Props {
   setPersonalData: Dispatch<SetStateAction<ICustomer>>;
   setPhoneData: Dispatch<SetStateAction<IPhone>>;
   modalNext: () => void;
   modalBack: () => void;
}

export default function CreateCustomerModal({
   setPersonalData,
   setPhoneData,
   modalBack,
   modalNext,
}: Props) {
   const {
      register,
      handleSubmit,
      setValue,
      reset,
      formState: { errors },
   } = useForm<ICustomerSchema>({
      resolver: yupResolver(customerSchema),
      mode: "onBlur",
   });

   const onSubmit: SubmitHandler<ICustomerSchema> = async (data) => {
      const gender = data.gender as "MASCULINO" | "FEMININO" | "OUTRO";
      const phoneType = data.phoneType as
         | "CELULAR"
         | "RESIDENCIAL"
         | "COMERCIAL"
         | "OUTRO";
      setPersonalData(() => ({
         _id: 0,
         _name: data.name,
         _birthDate: data.birthDate,
         _cpf: data.cpf,
         _confPassword: data.confPassword,
         _email: data.email,
         _gender: gender,
         _password: data.password,
         _ranking: data.ranking,
         _status: true,
      }));
      setPhoneData(() => ({
         _id: 0,
         _customerId: 0,
         _ddd: data.number.substring(0, 2),
         _number: data.number.substring(2),
         _phoneType: phoneType,
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
