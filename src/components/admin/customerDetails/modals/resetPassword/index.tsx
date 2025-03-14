import { useUpdatePassword } from "@/src/store/CustomerDetailsStore";

import {
   StyledDialog,
   StyledOverlay,
} from "@/src/components/admin/common/modal/modal.styles";
import ModalHeader from "@/src/components/admin/common/modal/modalHeader";
import ModalFooter from "@/src/components/admin/common/modal/modalFooter";
import ResetPasswordForm from "./form";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { SuccesToast } from "@/src/components/common/toastify/succesToast";
import { Customer } from "@/src/@types/api";
import {
   IResetPasswordSchema,
   resetPasswordSchema,
} from "@/src/validations/resetPasswordSchema";
import { updateCustomer } from "@/src/services/CustomerService";

export default function ResetPassword() {
   const { isOpen, closeModal, customerId } = useUpdatePassword();

   const {
      register,
      handleSubmit,
      setValue,
      reset,
      formState: { errors },
   } = useForm<IResetPasswordSchema>({
      resolver: yupResolver(resetPasswordSchema),
      mode: "onBlur",
   });

   const onSubmit = async (data: IResetPasswordSchema) => {
      try {
         const customer: Partial<Customer> = {
            password: data.newPassword,
            confPassword: data.lastPassword,
         };

         await updateCustomer(customerId, customer as Customer);
         reset();
         closeModal();
         toast(SuccesToast, {
            data: {
               title: "Sucesso!",
               message: "Senha alterada com sucesso!",
            },
            autoClose: false,
            position: "top-center",
            closeButton: false,
            hideProgressBar: true,
         });
      } catch (error: any) {
         toast.error(`${error.response.data}`);
      }
   };

   if (!isOpen) return null;

   return (
      <StyledOverlay>
         <StyledDialog>
            <ModalHeader>Alterar senha</ModalHeader>
            <ResetPasswordForm register={register} errors={errors} />
            <ModalFooter
               onCancel={closeModal}
               onSubmit={handleSubmit(onSubmit)}
            >
               Alterar
            </ModalFooter>
         </StyledDialog>
      </StyledOverlay>
   );
}
