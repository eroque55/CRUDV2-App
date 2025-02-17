import {
   StyledDialog,
   StyledOverlay,
} from "@/src/components/commom/Modal/modal.styles";
import ModalHeader from "@/src/components/commom/Modal/ModalHeader";
import ModalFooter from "@/src/components/commom/Modal/ModalFooter";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Form from "./Form";
import {
   IUpdateCustomerSchema,
   updateCustomerSchema,
} from "@/src/validations/updateCustomerSchema";
import { updateCustomer } from "@/src/services/CustomerService";
import { toast } from "react-toastify";
import { SuccesToast } from "@/src/components/commom/Toastify/SuccesToast";
import {
   useCustomerState,
   useUpdateCustomer,
} from "@/src/store/CustomerDetailsStore";
import { useEffect } from "react";
import { Customer, Phone } from "@/src/@types/api";
import { Gender, PhoneType } from "@/src/@types/enums";
import { updatePhone } from "@/src/services/PhoneService";

export default function UpdatePersonalDataModal() {
   const { closeModal, isOpen } = useUpdateCustomer();
   const { getCustomer, customer } = useCustomerState();

   const {
      register,
      handleSubmit,
      formState: { errors },
      setValue,
   } = useForm<IUpdateCustomerSchema>({
      resolver: yupResolver(updateCustomerSchema),
      mode: "onBlur",
   });

   const submit: SubmitHandler<IUpdateCustomerSchema> = async (data) => {
      try {
         if (!customer) {
            throw new Error("Cliente não encontrado");
         }

         const updatedPhone: Phone = {
            id: customer.phones?.[0].id || 0,
            ddd: data.number.substring(0, 2),
            number: data.number.substring(2),
            phoneType: data.phoneType as PhoneType,
         };

         const updatedCustomer: Customer = {
            id: customer.id,
            name: data.name,
            birthDate: data.birthDate,
            cpf: data.cpf,
            gender: data.gender as Gender,
            email: data.email,
            ranking: data.ranking,
            status: true,
            password: "",
            confPassword: "",
         };

         if (customer?.id !== undefined) {
            await updateCustomer(customer.id, updatedCustomer);
            await updatePhone(updatedPhone.id, updatedPhone);
         } else {
            throw new Error("Id do cliente não encontrado");
         }

         toast(SuccesToast, {
            data: {
               title: "Sucesso!",
               message: "Dados pessoais editado com sucesso!",
            },
            autoClose: false,
            position: "top-center",
            closeButton: false,
            hideProgressBar: true,
         });

         if (!customer?.id) {
            throw new Error("Cliente não encontrado");
         }

         await getCustomer(customer.id);
         closeModal();
      } catch (error) {
         alert("Erro ao editar endereço");
      }
   };

   if (!isOpen || !customer) return null;

   return (
      <StyledOverlay>
         <StyledDialog>
            <ModalHeader>Editar dados pessoais</ModalHeader>
            <Form setValue={setValue} register={register} errors={errors} />
            <ModalFooter onCancel={closeModal} onSubmit={handleSubmit(submit)}>
               Salvar
            </ModalFooter>
         </StyledDialog>
      </StyledOverlay>
   );
}
