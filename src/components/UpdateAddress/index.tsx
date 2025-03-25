import {
   StyledDialog,
   StyledOverlay,
} from "@/src/components/Modalzz/modal.styles";
import ModalHeader from "@/src/components/Modalzz/modalHeader";
import ModalFooter from "@/src/components/Modalzz/modalFooter";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Form from "./form";
import { IAddressSchema, addressSchema } from "@/src/validations/addressSchema";
import { updateAddress } from "@/src/services/Address.service";
import { toast } from "react-toastify";
import {
   useCustomerState,
   useUpdateAddress,
} from "@/src/store/CustomerDetailsStore";
import { Address } from "@/src/interfaces/api";
import { AddressType, ResidenceType, StreetType } from "@/src/interfaces/enums";
import { SuccesToast } from "@/src/components/SuccesToast";

export default function UpdateAddressModal() {
   const { closeModal, isOpen, item } = useUpdateAddress();
   const { getCustomer, customer } = useCustomerState();

   const {
      register,
      handleSubmit,
      formState: { errors },
      setValue,
   } = useForm<IAddressSchema>({
      resolver: yupResolver(addressSchema),
      mode: "onBlur",
   });

   const submit: SubmitHandler<IAddressSchema> = async (data) => {
      try {
         if (!item) {
            throw new Error("Endereço não encontrado");
         }

         const address: Partial<Address> = {
            id: item.id,
            nickname: data.nickname,
            street: data.street,
            number: data.number,
            neighborhood: data.neighborhood,
            cep: data.cep,
            complement: data.complement,
            city: {
               id: data.cityId,
               name: "",
               state: {
                  id: data.stateId,
                  name: "",
                  cities: [],
                  country: { id: data.countryId, name: "", states: [] },
               },
            },
            addressType: data.addressType as AddressType,
            streetType: data.streetType as StreetType,
            residenceType: data.residenceType as ResidenceType,
         };
         await updateAddress(item.id, address);
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

         await getCustomer(customer?.id || 0);
         closeModal();
      } catch (error: any) {
         toast.error(error.response.data);
      }
   };

   if (!isOpen || !item) return null;

   return (
      <StyledOverlay>
         <StyledDialog>
            <ModalHeader>Editar endereço</ModalHeader>
            <Form
               address={item}
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
