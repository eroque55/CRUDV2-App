import { StyledDialog } from "@/src/components/commom/Modal/modal.styles";
import ModalHeader from "@/src/components/commom/Modal/ModalHeader";
import ModalFooter from "@/src/components/commom/Modal/ModalFooter";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Form from "../AddressForm";
import { IAddressSchema, addressSchema } from "@/src/validations/addressSchema";
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
            id: 0,
            customerId: 0,
            nickname: data.nickname,
            street: data.street,
            number: data.number,
            neighborhood: data.neighborhood,
            cep: data.cep,
            complement: data.complement,
            city: {
               id: data.cityId,
               name: "0",
               state: {
                  id: data.stateId,
                  name: "0",
                  country: {
                     id: data.countryId,
                     name: "0",
                  },
               },
            },
            addressType: "COBRANCA",
            streetType: streetType,
            residenceType: residenceType,
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
