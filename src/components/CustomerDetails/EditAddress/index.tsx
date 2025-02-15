import {
   StyledDialog,
   StyledOverlay,
} from "@/src/components/commom/Modal/modal.styles";
import ModalHeader from "@/src/components/commom/Modal/ModalHeader";
import ModalFooter from "@/src/components/commom/Modal/ModalFooter";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Form from "./Form";
import { IAddressSchema, addressSchema } from "@/src/validations/addressSchema";
import IAddress from "@/src/@types/IAddress";
import { updateAddress } from "@/src/services/AddressService";
import { toast } from "react-toastify";
import { SuccesToast } from "../../commom/Toastify/ToastContainer";
import { useUpdateAddress } from "@/src/store/CustomerDetailsStore";
import { useEffect } from "react";
import { useAddressesStore } from "@/src/store/AddressStore";

export default function UpdateAddressModal() {
   const { closeModal, isOpen, item } = useUpdateAddress();
   const { getAddressesByCustomer } = useAddressesStore();

   const {
      register,
      handleSubmit,
      formState: { errors },
      setValue,
   } = useForm<IAddressSchema>({
      resolver: yupResolver(addressSchema),
      mode: "onBlur",
   });

   useEffect(() => {
      if (item) {
         setValue("nickname", item.nickname || "");
         setValue("street", item.street || "");
         setValue("number", item.number || 0);
         setValue("neighborhood", item.neighborhood || "");
         setValue("cep", item.cep || "00000000");
         setValue("complement", item.complement || "");
         setValue("cityId", item.cityId || 0);
         setValue("streetType", item.streetType || "OUTRO");
         setValue("residenceType", item.residenceType || "OUTRO");
      }
   }, [item, setValue]);

   const submit: SubmitHandler<IAddressSchema> = async (data) => {
      try {
         if (!item) {
            throw new Error("Endereço não encontrado");
         }
         const streetType = data.streetType as
            | "RUA"
            | "AVENIDA"
            | "TRAVESSA"
            | "ALAMEDA"
            | "ESTRADA"
            | "OUTRO";
         const residenceType = data.residenceType as
            | "CASA"
            | "APARTAMENTO"
            | "OUTRO";

         const address: IAddress = {
            id: item.id,
            customerId: item.customerId,
            nickname: data.nickname,
            street: data.street,
            number: data.number,
            neighborhood: data.neighborhood,
            cep: data.cep,
            complement: data.complement,
            cityId: data.cityId,
            addressType: "ENTREGA",
            streetType: streetType,
            residenceType: residenceType,
         };
         if (item?.id !== undefined) {
            await updateAddress(item.id, address);
         } else {
            throw new Error("Id do endereço não encontrado");
         }
         toast(SuccesToast, {
            data: {
               title: "Sucesso!",
               message: "Endereço editado com sucesso!",
            },
            autoClose: false,
            position: "top-center",
            closeButton: false,
            hideProgressBar: true,
         });

         await getAddressesByCustomer(item.customerId);
         closeModal();
      } catch (error) {
         alert("Erro ao editar endereço");
      }
   };

   if (!isOpen || !item) return null;

   return (
      <StyledOverlay>
         <StyledDialog>
            <ModalHeader>Editar endereço</ModalHeader>
            <Form
               cep={item.cep}
               setValue={setValue}
               register={register}
               errors={errors}
            />
            <ModalFooter onCancel={closeModal} onSubmit={handleSubmit(submit)}>
               Salvar
            </ModalFooter>
         </StyledDialog>
      </StyledOverlay>
   );
}
