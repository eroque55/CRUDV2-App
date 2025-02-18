import { StyledDialog } from "@/src/components/Commom/Modal/modal.styles";
import ModalHeader from "@/src/components/Commom/Modal/ModalHeader";
import ModalFooter from "@/src/components/Commom/Modal/ModalFooter";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Form from "../AddressForm";
import { IAddressSchema, addressSchema } from "@/src/validations/addressSchema";
import { Dispatch, SetStateAction } from "react";

import { Customer, Address } from "@/src/@types/api";
import { AddressType, ResidenceType, StreetType } from "@/src/@types/enums";

interface Props {
   setCustomer: Dispatch<SetStateAction<Customer>>;
   onCancel: () => void;
   onSubmit: () => void;
}

export default function BillingAddress({
   setCustomer,
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
         const address: Address = {
            nickname: data.nickname,
            street: data.street,
            number: data.number,
            neighborhood: data.neighborhood,
            cep: data.cep,
            city: {
               id: data.cityId,
               name: "",
               state: {
                  id: data.stateId,
                  name: "",
                  country: { id: data.countryId, name: "" },
               },
            },
            complement: data.complement,
            addressType: "COBRANCA" as AddressType,
            residenceType: data.residenceType as ResidenceType,
            streetType: data.streetType as StreetType,
         };

         setCustomer((prevCustomer) => ({
            ...prevCustomer,
            addresses: [...(prevCustomer.addresses || []), address],
         }));

         onSubmit();
      } catch (error) {
         console.error("Erro ao salvar endereço:", error);
         alert("Erro ao salvar endereço");
      }
   };

   return (
      <StyledDialog>
         <ModalHeader>Cadastrar Cliente 2/3 - Endereço de cobrança</ModalHeader>
         <Form setValue={setValue} register={register} errors={errors} />
         <ModalFooter onCancel={onCancel} onSubmit={handleSubmit(submit)}>
            Próximo
         </ModalFooter>
      </StyledDialog>
   );
}
