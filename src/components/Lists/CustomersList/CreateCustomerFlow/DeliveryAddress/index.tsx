import { StyledDialog } from "@/src/components/Modal/modal.styles";
import ModalHeader from "@/src/components/Modal/ModalHeader";
import ModalFooter from "@/src/components/Modal/ModalFooter";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Form from "../AddressForm";
import { IAddressSchema, addressSchema } from "@/src/validations/Address";
import { Dispatch, SetStateAction } from "react";
import IAddress from "@/src/@types/IAddress";

interface Props {
   setAddressData: Dispatch<SetStateAction<IAddress>>;
   onCancel: () => void;
   onSubmit: () => void;
}

export default function BillingAddress({
   setAddressData,
   onCancel,
   onSubmit,
}: Props) {
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

         setAddressData(() => ({
            _id: 0,
            _customerId: 0,
            _nickname: data.nickname,
            _street: data.street,
            _number: data.number,
            _neighborhood: data.neighborhood,
            _cep: data.cep,
            _complement: data.complement,
            _cityId: data.cityId,
            _addressType: "ENTREGA",
            _streetType: streetType,
            _residenceType: residenceType,
         }));

         onSubmit();
      } catch (error) {
         console.error("Erro ao salvar endereço:", error);
         alert("Erro ao salvar endereço");
      }
   };

   return (
      <StyledDialog>
         <ModalHeader>Cadastrar Cliente 3/3 - Endereço de entrega</ModalHeader>
         <Form setValue={setValue} register={register} errors={errors} />
         <ModalFooter onCancel={onCancel} onSubmit={handleSubmit(submit)}>
            Salvar
         </ModalFooter>
      </StyledDialog>
   );
}
