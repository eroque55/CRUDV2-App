import { StyledDialog } from "@/src/components/commom/Modal/modal.styles";
import ModalHeader from "@/src/components/commom/Modal/ModalHeader";
import ModalFooter from "@/src/components/commom/Modal/ModalFooter";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Form from "./Form";
import { IAddressSchema, addressSchema } from "@/src/validations/addressSchema";
import IAddress from "@/src/@types/IAddress";
import { updateAddress } from "@/src/services/AddressService";
import { toast, ToastContentProps } from "react-toastify";
import { SuccesToast } from "../ToastContainer";

type CustomNotificationProps = ToastContentProps<{
   addressId: number;
   fetchData: () => void;
}>;

export default function EditAddress({
   closeToast,
   data,
}: CustomNotificationProps) {
   const {
      register,
      handleSubmit,
      formState: { errors },
      setValue,
   } = useForm<IAddressSchema>({
      resolver: yupResolver(addressSchema),
      mode: "onBlur",
   });

   const submit: SubmitHandler<IAddressSchema> = async (formData) => {
      try {
         const streetType = formData.streetType as
            | "RUA"
            | "AVENIDA"
            | "TRAVESSA"
            | "ALAMEDA"
            | "ESTRADA"
            | "OUTRO";
         const residenceType = formData.residenceType as
            | "CASA"
            | "APARTAMENTO"
            | "OUTRO";

         const address: IAddress = {
            _id: data.addressId,
            _customerId: 0,
            _nickname: formData.nickname,
            _street: formData.street,
            _number: formData.number,
            _neighborhood: formData.neighborhood,
            _cep: formData.cep,
            _complement: formData.complement,
            _cityId: formData.cityId,
            _addressType: "ENTREGA",
            _streetType: streetType,
            _residenceType: residenceType,
         };
         await updateAddress(data.addressId, address);
         toast(SuccesToast, {
            data: {
               title: "Sucesso!",
               message: "Endereço excluido com sucesso!",
            },
            autoClose: false,
            position: "top-center",
            closeButton: false,
            hideProgressBar: true,
         });
         await data.fetchData();
         closeToast();
      } catch (error) {
         alert("Erro ao salvar endereço");
      }
   };

   return (
      <StyledDialog>
         <ModalHeader>Editar endereço</ModalHeader>
         <Form setValue={setValue} register={register} errors={errors} />
         <ModalFooter onCancel={closeToast} onSubmit={handleSubmit(submit)}>
            Salvar
         </ModalFooter>
      </StyledDialog>
   );
}
