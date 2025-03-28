import {
   StyledDialog,
   StyledOverlay,
} from "@/src/components/Modalzz/modal.styles";
import ModalHeader from "@/src/components/Modalzz/modalHeader";
import ModalFooter from "@/src/components/Modalzz/modalFooter";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Form from "./form";
import {
   ICustomerUpdateSchema,
   CustomerUpdateSchema,
} from "@/src/validations/CustomerUpdateSchema";
import { updateCustomer } from "@/src/services/Customer.service";
import { toast } from "react-toastify";
import {
   useCustomerState,
   useUpdateCustomer,
} from "@/src/store/CustomerDetailsStore";
import { Customer, Phone } from "@/src/interfaces/api";
import { Gender, PhoneType } from "@/src/interfaces/enums";
import { updatePhone } from "@/src/services/Phone.service";
import { SuccesToast } from "@/src/components/SuccesToast";

export default function UpdatePersonalDataModal() {
   const { closeModal, isOpen } = useUpdateCustomer();
   const { getCustomer, customer } = useCustomerState();

   const {
      register,
      handleSubmit,
      formState: { errors },
      setValue,
   } = useForm<ICustomerUpdateSchema>({
      resolver: yupResolver(CustomerUpdateSchema),
      mode: "onBlur",
   });

   const submit: SubmitHandler<ICustomerUpdateSchema> = async (data) => {
      try {
         if (!customer) {
            throw new Error("Cliente não encontrado");
         }

         const updatedPhone: Partial<Phone> = {
            id: customer.phone.id || 0,
            ddd: data.number.substring(0, 2),
            number: data.number.substring(2),
            phoneType: data.phoneType as PhoneType,
         };

         const updatedCustomer: Partial<Customer> = {
            name: data.name,
            birthDate: data.birthDate,
            cpf: data.cpf,
            gender: data.gender as Gender,
            email: data.email,
            ranking: data.ranking,
            status: true,
         };

         if (customer?.id !== undefined) {
            await updateCustomer(customer.id, updatedCustomer);
            await updatePhone(updatedPhone.id || 0, updatedPhone);
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
      } catch (error: any) {
         toast.error(error.response.data);
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
