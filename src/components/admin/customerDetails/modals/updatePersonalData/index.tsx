import {
   StyledDialog,
   StyledOverlay,
} from "@/src/components/admin/common/modal/modal.styles";
import ModalHeader from "@/src/components/admin/common/modal/modalHeader";
import ModalFooter from "@/src/components/admin/common/modal/modalFooter";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Form from "./form";
import {
   IUpdateCustomerSchema,
   updateCustomerSchema,
} from "@/src/validations/updateCustomerSchema";
import { updateCustomer } from "@/src/services/CustomerService";
import { toast } from "react-toastify";
import {
   useCustomerState,
   useUpdateCustomer,
} from "@/src/store/CustomerDetailsStore";
import { Customer, Phone } from "@/src/@types/api";
import { Gender, PhoneType } from "@/src/@types/enums";
import { updatePhone } from "@/src/services/PhoneService";
import { SuccesToast } from "@/src/components/common/toastify/succesToast";

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
